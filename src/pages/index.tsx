import Editor from '@/components/editor'
import EditorFooter from '@/components/editorFooter'

export default function Index() {
  return (
    <main className="h-screen w-screen overflow-auto bg-gray-50 transition-colors dark:bg-gray-900">
      <Editor>
        <EditorFooter />
      </Editor>
    </main>
  )
}
