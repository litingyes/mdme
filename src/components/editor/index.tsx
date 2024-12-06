import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { symbol } from '@vueditor/tiptap-extension-symbol'
import { Markdown } from 'tiptap-markdown'
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
    Table,
    TableRow,
    TableHeader,
    TableCell,
    Markdown,
    symbol,
  ]

  return (
    <EditorProvider extensions={extensions} content={content} />
  )
}
