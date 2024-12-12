import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import { symbol } from './extensions/symbol'
import { tauri } from './extensions/tauri'
import './index.scss'

export default function Editor() {
  const content = `
 MDME 
  `

  const extensions = [
    StarterKit.configure({
      hardBreak: false,
    }),
    TaskList,
    TaskItem,
    Table.configure({
      resizable: true,
      cellMinWidth: 64,
      HTMLAttributes: {
        'data-node-name': 'table',
      },
    }),
    TableRow,
    TableHeader,
    TableCell,
    Markdown,
    symbol,
    tauri,
  ]

  return (
    <EditorProvider extensions={extensions} content={content} />
  )
}
