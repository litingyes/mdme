import type { GlobalAttributes } from '@tiptap/react'
import { Extension } from '@tiptap/react'

export const symbol = Extension.create({
  name: 'symbol',
  addGlobalAttributes() {
    const attrs: GlobalAttributes = []

    attrs.push(...(this.extensions.filter(ext => ext.name !== 'text').map(ext => ({
      types: [ext.name],
      attributes: {
        nodeName: {
          default: ext.name,
          renderHTML(attributes) {
            return {
              'data-node-name': attributes.nodeName,
            }
          },
          parseHTML(element) {
            return element.getAttribute('data-node-name')
          },
        },
      },
    })) as GlobalAttributes))

    return attrs
  },
})
