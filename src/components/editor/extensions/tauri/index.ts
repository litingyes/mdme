import type { UnlistenFn } from '@tauri-apps/api/event'
import type { Level } from '@tiptap/extension-heading'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { Extension } from '@tiptap/react'
import { debounce, kebabCase } from 'lodash-es'

let unlistenSetHeading: UnlistenFn
let unlistenSetQuoteBlock: UnlistenFn
let unlistenSetCodeBlock: UnlistenFn
let unlistenInsertTable: UnlistenFn
let unlistenToggleOrderedList: UnlistenFn
let unlistenToggleBulletList: UnlistenFn
let unlistenToggleTaskList: UnlistenFn
const onChangeEditorActiveDebounce = debounce((activeName: string) => {
  invoke('on_change_editor_active', {
    activeName,
  })
}, 300)

export const tauri = Extension.create({
  name: 'tauri',
  async onCreate() {
    unlistenSetHeading = await listen('set-heading', ({ payload }: { payload: { level: Level } }) => {
      this.editor.chain().setHeading({
        level: payload.level,
      }).focus().run()
    })
    unlistenSetQuoteBlock = await listen('set-quote-block', () => {
      this.editor.chain().setBlockquote().focus().run()
    })
    unlistenSetCodeBlock = await listen('set-code-block', () => {
      this.editor.chain().setCodeBlock().focus().run()
    })
    unlistenInsertTable = await listen('insert-table', () => {
      this.editor.chain().insertTable({
        rows: 3,
        cols: 5,
        withHeaderRow: true,
      }).focus().run()
    })
    unlistenToggleOrderedList = await listen('toggle-ordered-list', () => {
      this.editor.chain().toggleOrderedList().focus().run()
    })
    unlistenToggleBulletList = await listen('toggle-bullet-list', () => {
      this.editor.chain().toggleBulletList().focus().run()
    })
    unlistenToggleTaskList = await listen('toggle-task-list', () => {
      this.editor.chain().toggleTaskList().focus().run()
    })
  },
  onSelectionUpdate() {
    const { selection } = this.editor.state
    const node = selection.$anchor.node(1)
    const nodeName = node.type.name

    if (nodeName === 'heading') {
      onChangeEditorActiveDebounce(`heading-${node.attrs.level}`)
    }
    else {
      onChangeEditorActiveDebounce(kebabCase(nodeName))
    }
  },
  onUpdate() {
    const { selection } = this.editor.state
    const node = selection.$anchor.node(1)
    const nodeName = node.type.name

    if (nodeName === 'heading') {
      onChangeEditorActiveDebounce(`heading-${node.attrs.level}`)
    }
    else {
      onChangeEditorActiveDebounce(kebabCase(nodeName))
    }
  },
  onDestroy() {
    unlistenSetHeading && unlistenSetHeading()
    unlistenSetQuoteBlock && unlistenSetQuoteBlock()
    unlistenSetCodeBlock && unlistenSetCodeBlock()
    unlistenInsertTable && unlistenInsertTable()
    unlistenToggleOrderedList && unlistenToggleOrderedList()
    unlistenToggleBulletList && unlistenToggleBulletList()
    unlistenToggleTaskList && unlistenToggleTaskList()
  },
})

export default tauri
