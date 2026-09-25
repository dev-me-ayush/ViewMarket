"use client"

import * as React from "react"

interface UseTypewriterOptions {
  words: readonly string[]
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
  loop?: boolean
}

export function useTypewriter({
  words,
  typeSpeed = 45,
  deleteSpeed = 25,
  delayBetweenWords = 1800,
  loop = true,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [displayText, setDisplayText] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    if (!words || words.length === 0) return

    const currentWord = words[currentWordIndex]

    let timer: NodeJS.Timeout

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        }, typeSpeed)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, delayBetweenWords)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
        }, deleteSpeed)
      } else {
        setIsDeleting(false)
        setCurrentWordIndex((prev) =>
          prev + 1 < words.length ? prev + 1 : loop ? 0 : prev
        )
      }
    }

    return () => clearTimeout(timer)
  }, [
    displayText,
    isDeleting,
    currentWordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  ])

  return {
    displayText,
    currentWord: words[currentWordIndex] || "",
  }
}
