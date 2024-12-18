import { Tab, Tabs } from '@nextui-org/react'
import Appearance from './appearance.tsx'
import Storage from './storage.tsx'

const tabs = [
  {
    label: 'Storage',
    icon: <i className="icon-[material-symbols--storage-rounded] size-4" />,
    component: <Storage />,
  },
  {
    label: 'Appearance',
    icon: <i className="icon-[pajamas--appearance] size-4" />,
    component: <Appearance />,
  },
]

export default function Settings() {
  return (
    <main className="h-screen overflow-auto p-4">
      <Tabs items={tabs} aria-label="Settings">
        {
          item => (
            <Tab
              key={item.label}
              title={(
                <div className="flex items-center gap-1">
                  {item.icon}
                  {item.label}
                </div>
              )}
            >
              {item.component}
            </Tab>
          )
        }
      </Tabs>
    </main>
  )
}
