import type { OpenNodes } from './dialog'
import { createContext, useContext } from 'react'

export const SingletonDialogContext = createContext<{
  open: (nodes: OpenNodes) => void
  close: () => void
} | null>(null)

export function useSingletonDialog() {
  return useContext(SingletonDialogContext)!
}
