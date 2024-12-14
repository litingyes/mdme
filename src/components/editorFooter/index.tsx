import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { useState } from 'react'

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

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-8 flex items-center justify-between border-t border-stone-200 border-solid bg-gray-50/5 px-6 backdrop-blur-md dark:border-stone-800">
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
