export function countWords(text: string) {
  text = text?.trim()
  if (!text) {
    return 0
  }

  const regex = /[\u4E00-\u9FA5\u3040-\u30FF\uAC00-\uD7AF]|\w+/g
  const words = text.match(regex)

  return words?.length ?? 0
}

// minutes
export function readTime(text: string) {
  const words = countWords(text)

  return Math.ceil(words / 200)
}
