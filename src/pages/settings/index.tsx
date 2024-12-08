import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Appearance from './appearance.tsx'

const MODULES = [
  {
    label: 'Appearance',
    component: <Appearance />,
  },
]

export default function Settings() {
  return (
    <main className="h-screen w-screen overflow-auto bg-gray-50 p-4 text-neutral-800 transition-colors dark:(bg-gray-900 text-neutral-100)">
      <TabGroup className="flex gap-4">
        <TabList>
          {
            MODULES.map(item => <Tab key={item.label} className="cursor-pointer rounded-lg px-2 py-1 text-sm font-semibold transition-colors data-[hover]:(bg-gray-200) !data-[active]:(bg-blue-600 text-white) !data-[selected]:(bg-blue-500 text-white) dark:!data-[active]:bg-blue-600">{item.label}</Tab>)
          }
        </TabList>
        <TabPanels>
          {
            MODULES.map(item => <TabPanel key={item.label}>{item.component}</TabPanel>)
          }
        </TabPanels>
      </TabGroup>
    </main>
  )
}
