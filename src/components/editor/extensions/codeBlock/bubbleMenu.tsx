import type { CodeBlockStorage } from './index'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { BubbleMenu, useCurrentEditor, useEditorState } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { sticky } from 'tippy.js'

export default function CodeBlockBubbleMenu() {
  const { editor } = useCurrentEditor()

  const getReferenceClientRect = () => {
    if (!editor?.isActive('codeBlock')) {
      return null
    }

    const { view, state } = editor

    return view.domAtPos(state.selection.$anchor.start()).node.parentElement?.getBoundingClientRect().toJSON()
  }

  const editorState = useEditorState({
    editor: editor!,
    selector: ({ editor }) => {
      const { state, storage } = editor
      const node = state.selection.$anchor.parent
      const language = node.attrs.language ?? 'text'

      let pos = -1
      state.doc.descendants((_node, _pos) => {
        if (_node.eq(node)) {
          pos = _pos
        }
      })

      const highlighter = (storage.codeBlock as CodeBlockStorage).highlighter
      const languages = highlighter.getLoadedLanguages().sort()

      return {
        pos,
        language,
        languages,
      }
    },
  })

  const [currentLanguage, setCurrentLanguage] = useState(editorState.language)
  useEffect(() => {
    if (editorState.language === currentLanguage) {
      return
    }

    setCurrentLanguage(editorState.language)
  }, [editorState.language, currentLanguage])
  const onChangeLanguage = (language: string) => {
    const dispatch = editor!.view.dispatch
    const tr = editor!.state.tr

    if (!dispatch) {
      return
    }

    dispatch(tr.setNodeAttribute(editorState.pos, 'language', language))
  }

  if (!editor) {
    return null
  }

  return (
    <BubbleMenu editor={editor} pluginKey="codeBlockBubbleMenu" tippyOptions={{ appendTo: document.body, placement: 'top-end', getReferenceClientRect, sticky: 'reference', plugins: [sticky] }} shouldShow={({ editor }) => editor.isActive('codeBlock')}>
      <div className="w-40 rounded-lg bg-gray-200 p-2 shadow-lg dark:bg-gray-800">
        <Autocomplete inputProps={{ classNames: { inputWrapper: 'bg-transparent shadow-none' } }} aria-label="Code block language" placeholder="Language" size="sm" value={currentLanguage} onSelectionChange={language => onChangeLanguage(language as string)}>
          {editorState.languages.map(language => <AutocompleteItem key={language}>{language}</AutocompleteItem>)}
        </Autocomplete>
      </div>
    </BubbleMenu>
  )
}
