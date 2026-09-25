# Infrastructure Specification: ModernBERT System 1 Decision Engine

This document provides the end-to-end technical reference for the **ModernBERT System 1 AI Decision Engine** infrastructure deployed on Amazon Web Services (AWS) for the ViewMarket platform.

---

## 1. General Overview

- **Service Name**: ViewMarket Decision Engine (`viewmarket-decision-engine`)
- **Primary Function**: Sub-30ms deterministic Natural Language Inference (NLI) for rule verification, strategy triggering, risk parameter enforcement, and Voice/Chat Agent (VA) tool gating.
- **Model Hosted**: ModernBERT Cross-Encoder (`dleemiller/ModernCE-base-nli`, 149M parameters).
- **Execution Engine**: Microsoft ONNX Runtime with transformer graph fusion (fused Multi-Head Attention, FastGELU, LayerNorm).
- **Deployment Date**: September 25, 2026.

---

## 2. Cloud Environment & Network Topology

| Parameter | Configuration Value |
| :--- | :--- |
| **Cloud Provider** | Amazon Web Services (AWS) |
| **AWS Account ID** | `513329232477` (IAM User: `code.dev`) |
| **Region** | `ap-south-1` (Asia Pacific - Mumbai) |
| **Availability Zone** | `ap-south-1a` |
| **VPC ID** | `vpc-092c8de4b89866317` (Default VPC) |
| **Subnet ID** | `subnet-01d5adcaa784d7cb3` (`MapPublicIpOnLaunch: true`) |
| **Public IPv4** | `13.200.254.164` |
| **Private IPv4** | `172.31.46.77` |
| **Network Performance** | Up to 12.5 Gbps baseline burst |

---

## 3. Machine Hardware Configuration

| Component | Hardware Specification |
| :--- | :--- |
| **EC2 Instance ID** | `i-013786eee786ef760` |
| **Instance Type** | `c6a.2xlarge` (Compute-Optimized) |
| **Processor** | AMD EPYC 7R13 Processor (Milan Architecture) |
| **Clock Speed** | 3.6 GHz Max Turbo |
| **vCPU Allocation** | **8 dedicated vCPUs** (100% of AWS account standard quota utilized) |
| **Vector Instruction Sets** | AVX2, FMA3, BMI1, BMI2 |
| **Memory (RAM)** | **16 GiB DDR4** (Model pinned in physical memory, 0ms cold start) |
| **Root Disk** | 30 GiB gp3 SSD (3,000 IOPS, 125 MB/s throughput, device `/dev/sda1`) |
| **Operating System** | Ubuntu 24.04 LTS (Noble Numbat, Kernel 7.0.0-1013-aws, `x86_64`) |
| **AMI ID** | `ami-007b1f3fdea0383d9` |

---

## 4. Security & Access Control

### Security Group (`sg-07162b0470212f200` - `viewmarket-decision-sg`)

| Protocol | Port Range | Source | Purpose |
| :--- | :--- | :--- | :--- |
| **TCP** | `80` (HTTP) | `0.0.0.0/0` | Public reverse-proxy entry point (protected by HMAC token) |
| **TCP** | `8000` (FastAPI) | `0.0.0.0/0` | Direct application port (protected by HMAC token) |
| **TCP** | `22` (SSH) | `0.0.0.0/0` | Administrative shell access via EC2 key pair |

### Cryptographic Header Authentication (Zero-Trust)

All evaluation requests (`/evaluate` and `/evaluate-batch`) require the internal secret header:

```http
X-Internal-Secret: vm_sec_86906c6a5f8f85f29475723d5439393e6b12b85a4c563d0140dbc7b753a5d40c
```

- Verified using constant-time string comparison (`hmac.compare_digest`) in the FastAPI authentication layer.
- Unauthenticated requests or invalid keys immediately receive `401 Unauthorized`.
- **Zero-Client-Exposure**: The secret key and AWS IP are stored exclusively in `.env.local` and Google Cloud Secret Manager (server-side). No `NEXT_PUBLIC_` prefix is used, ensuring the browser bundle never contains the IP or key.

---

## 5. Software Stack & Architecture

```
[ Inbound HTTP Traffic (Next.js Server on Google Cloud) ]
                          │
                          ▼
            [ Nginx Reverse Proxy (Port 80) ]
                          │  (Upstream Keep-Alive: 64 sockets)
                          ▼
       [ Gunicorn 26.2.0 Process Manager (Port 8000) ]
             ├─ Worker 1 (Uvicorn / 4 OpenMP Threads)
             └─ Worker 2 (Uvicorn / 4 OpenMP Threads)
                          │
                          ▼
        [ Microsoft ONNX Runtime 1.30.0 Engine ]
                          │  (AVX2 / FMA Vector Instructions)
                          ▼
          [ Fused ModernBERT Model Graph ]
             /opt/decision-engine/model_onnx/model.onnx
```

### Path Locations & System Services

- **Application Directory**: `/opt/decision-engine/`
- **Virtual Environment**: `/opt/decision-engine/venv/` (Python 3.12)
- **Model Graph**: `/opt/decision-engine/model_onnx/model.onnx` (FP32 graph-fused)
- **Server Code**: `/opt/decision-engine/server.py`
- **Systemd Unit File**: `/etc/systemd/system/decision-engine.service`
  ```ini
  [Unit]
  Description=ViewMarket ModernBERT Decision Engine (8 vCPUs)
  After=network.target

  [Service]
  Type=simple
  User=root
  WorkingDirectory=/opt/decision-engine
  ExecStart=/opt/decision-engine/venv/bin/gunicorn server:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 --timeout 120
  Restart=always
  RestartSec=3

  [Install]
  WantedBy=multi-user.target
  ```
- **Nginx Configuration**: `/etc/nginx/sites-available/default` (Configured with `upstream decision_backend { server 127.0.0.1:8000; keepalive 64; }`).

---

## 6. Financial & Billing Breakdown

| Billing Item | Unit Rate | Usage | Monthly Cost |
| :--- | :--- | :--- | :--- |
| **Compute (`c6a.2xlarge`)** | $0.1870 / hour | 730 hours (24/7) | **$136.51** |
| **Root EBS Volume (gp3)** | $0.0800 / GB-month | 30 GB | **$2.40** |
| **Data Transfer Out** | ~$0.09 / GB | Estimated ~10–20 GB | **~$1.50 – $2.50** |
| **Data Transfer In** | Free | Unlimited | **$0.00** |
| **Total Monthly Spend** | — | — | **~$138.91 – $141.41** |
| **Budget Ceiling** | — | — | **$150.00 / month** (Compliant) |

---

## 7. Performance & Latency Benchmarks

| Metric | Server Model Latency | End-to-End Latency | Throughput |
| :--- | :--- | :--- | :--- |
| **Single Short Condition (<20 tokens)** | **23.63 ms** | **~35ms** (Prod Inter-Cloud) | ~2,500 req/min |
| **Standard Trading Condition (~35 tokens)** | **36.02 ms** | **~45ms** (Prod Inter-Cloud) | ~2,150 req/min |
| **Batch Condition Evaluation (5 items)** | **85.00 ms total** | **~100ms** (Prod Inter-Cloud) | **17.0 ms / item** |
| **Batch Condition Evaluation (20 items)** | **320.03 ms total** | **~335ms** (Prod Inter-Cloud) | **16.0 ms / item** |
| **Cold Start Latency** | **0.00 ms** | **0.00 ms** | Permanent RAM Pin |

---

## 8. Operational & Maintenance Playbook

### Checking Health & Uptime
```bash
curl http://13.200.254.164/health
```

### SSH Remote Access
```bash
ssh -i "<path-to-key>/viewmarket-decision-key.pem" ubuntu@13.200.254.164
```

### Service Management Commands
```bash
# Check service status
sudo systemctl status decision-engine

# Restart service after updates
sudo systemctl restart decision-engine

# View live streaming service logs
sudo journalctl -u decision-engine -f

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx
```

### Testing Evaluation via cURL
```bash
curl -X POST http://13.200.254.164/evaluate \
  -H "Content-Type: application/json" \
  -H "X-Internal-Secret: vm_sec_86906c6a5f8f85f29475723d5439393e6b12b85a4c563d0140dbc7b753a5d40c" \
  -d '{"context": "BTC broke 68,000 resistance on high volume.", "condition": "Market is bullish."}'
```
