import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Appearance from './appearance.tsx'
import Storage from './storage.tsx'

const MODULES = [
  {
    label: 'Storage',
    component: <Storage />,
  },
  {
    label: 'Appearance',
    component: <Appearance />,
  },
]

export default function Settings() {
  return (
    <main className="h-screen overflow-auto p-4">
      <TabGroup className="h-full flex gap-2">
        <TabList className="max-h-full flex flex-col gap-2 overflow-auto rounded-lg p-2">
          {
            MODULES.map(item => <Tab key={item.label} className="cursor-pointer rounded-lg px-2 py-1 text-sm transition-colors data-[hover]:(bg-gray-200) !data-[active]:(bg-gray-300) !data-[selected]:(bg-blue-500 text-white) dark:!data-[active]:bg-blue-600">{item.label}</Tab>)
          }
        </TabList>
        <div className="h-full w-[1px] bg-stone-200 dark:bg-stone-800" />
        <TabPanels className="flex-1 p-2">
          {
            MODULES.map(item => <TabPanel key={item.label}>{item.component}</TabPanel>)
          }
        </TabPanels>
      </TabGroup>
    </main>
  )
}
