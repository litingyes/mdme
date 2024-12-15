import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Extension } from '@tiptap/react'

export const trailingNode = Extension.create({
  name: 'trailingNode',
  addProseMirrorPlugins() {
    const trailingNodeKey = new PluginKey('trailingNode')

    return [
      new Plugin<boolean>({
        key: trailingNodeKey,
        state: {
          init(_, { doc }) {
            const trailingNode = doc.lastChild

            return trailingNode?.type?.name !== 'paragraph' || !!trailingNode?.textContent
          },
          apply(tr, value) {
            if (!tr.docChanged) {
              return value
            }

            const trailingNode = tr.doc.lastChild

            return trailingNode?.type?.name !== 'paragraph' || !!trailingNode?.textContent
          },
        },
        appendTransaction(_, __, state) {
          const shouldInsert = trailingNodeKey.getState(state)
          if (!shouldInsert) {
            return
          }

          const { tr, doc, schema } = state

          return tr.insert(doc.content.size, schema.node('paragraph'))
        },
      }),
    ]
  },
})
