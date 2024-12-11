import type { FC, ReactNode } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { SingletonDialogContext } from './context'

export interface OpenNodes {
  title?: ReactNode
  content: ReactNode
  footer?: ReactNode
}

export const SingletonDialog: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState<ReactNode>(null)
  const [content, setContent] = useState<ReactNode>(null)
  const [footer, setFooter] = useState<ReactNode>(null)

  const open = ({ title, content, footer }: OpenNodes) => {
    title && setTitle(title)
    content && setContent(content)
    footer && setFooter(footer)
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
    setTitle(null)
    setContent(null)
    setFooter(null)
  }
  const contextValue = useMemo(() => ({
    open,
    close,
  }), [])

  return (
    <SingletonDialogContext.Provider value={contextValue}>
      {children}
      <Transition show={isOpen} as={Fragment} appear>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="max-w-md w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {
                    title && (
                      <DialogTitle
                        as="h3"
                        className="text-lg text-gray-900 font-medium leading-6"
                      >
                        {title}
                      </DialogTitle>
                    )
                  }
                  <div className="mt-2">
                    {content}
                  </div>
                  {footer && (
                    <div className="mt-4 flex items-center justify-end gap-2">
                      {footer}
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </SingletonDialogContext.Provider>
  )
}
