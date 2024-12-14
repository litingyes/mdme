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
    <main className="h-screen overflow-auto p-4">
      <TabGroup className="h-full flex gap-4">
        <TabList className="max-h-full overflow-auto rounded-lg bg-gray-200/50 p-2 backdrop-blur-md dark:bg-gray-700/50">
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
