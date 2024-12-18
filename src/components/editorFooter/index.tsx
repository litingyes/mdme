import { useSettings } from '@/hooks/useSettings'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { join } from '@tauri-apps/api/path'
import { confirm, save } from '@tauri-apps/plugin-dialog'
import { open } from '@tauri-apps/plugin-fs'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { useEffect, useState } from 'react'

export default function EditorFooter() {
  const [fileName, _] = useState('Untitled')

  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return ({
        characters: editor?.storage.statistics?.characters(),
        words: editor?.storage.statistics?.words(),
        minutes: editor?.storage.statistics?.minutes(),
      })
    },
  })

  const { documentsDir } = useSettings()
  const [filePath, setFilePath] = useState('')
  useEffect(() => {
    join(documentsDir, `${fileName}.md`).then((path) => {
      setFilePath(path)
    })
  }, [documentsDir, fileName])
  useEffect(() => {
    const unlisten = listen('close_editor_window', async () => {
      const path = await save({
        canCreateDirectories: true,
        defaultPath: filePath,
        title: 'Save the markdown',
      })

      if (!path) {
        const isContinue = await confirm('Delete this document or continue editing ?', {
          cancelLabel: 'Delete',
          kind: 'error',
          okLabel: 'Continue',
          title: fileName,
        })

        if (!isContinue) {
          invoke('destroy_window')
        }

        return
      }

      const file = await open(filePath, {
        read: true,
        write: true,
        create: true,
      })
      const encoder = new TextEncoder()
      const content = editor?.storage.markdown?.getMarkdown()
      const data = encoder.encode(content)

      await file.write(data)
      invoke('destroy_window')
    })

    return () => {
      unlisten.then(f => f())
    }
  }, [fileName, filePath, editor?.storage.markdown])

  return (
    <footer className="fixed inset-x-0 bottom-0 flex h-8 items-center justify-between border-t border-solid border-stone-200 bg-gray-50/5 px-6 backdrop-blur-md dark:border-stone-800">
      <div className="text-sm text-neutral-700 dark:text-neutral-300">{fileName}</div>
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <span>
          {`${editorState?.characters} Characters`}
        </span>
        <span>
          {`${editorState?.words} Words`}
        </span>
        <span>
          {`${editorState?.minutes} Minutes`}
        </span>
      </div>
    </footer>
  )
}
