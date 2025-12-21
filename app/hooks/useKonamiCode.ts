"use client"
import { useEffect, useState } from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export const useKonamiCode = () => {
  const [index, setIndex] = useState(0)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === KONAMI_CODE[index]) {
        const nextIndex = index + 1
        if (nextIndex === KONAMI_CODE.length) {
          setSuccess(true)
          setIndex(0)
        } else {
          setIndex(nextIndex)
        }
      } else {
        setIndex(0)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [index])

  return success
}
