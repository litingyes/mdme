import { Extension } from '@tiptap/react'
import { countWords, readTime } from './readTIme'

interface StatisticsStorage {
  characters: () => number
  words: () => number
  minutes: () => number
}

export const statistics = Extension.create<any, StatisticsStorage>({
  name: 'statistics',
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0,
      minutes: () => 0,
    }
  },
  onCreate() {
    this.storage.characters = () => this.editor.state.doc.textContent.trim().length
    this.storage.words = () => countWords(this.editor.state.doc.textContent.trim())
    this.storage.minutes = () => readTime(this.editor.state.doc.textContent.trim())
  },
})
