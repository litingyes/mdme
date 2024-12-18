import type { Theme } from '@tauri-apps/api/window'
import { Radio, RadioGroup } from '@headlessui/react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { useEffect, useMemo, useState } from 'react'

const THEMES = [
  {
    label: 'Auto',
    icon: <i className="i-mdi:desktop-windows" />,
  },
  {
    label: 'Light',
    icon: <i className="i-mdi:white-balance-sunny" />,
  },
  {
    label: 'Dark',
    icon: <i className="i-mdi:moon-waxing-crescent" />,
  },

]

export default function Appearance() {
  const [theme, setTheme] = useState<Theme | 'auto'>()
  const window = useMemo(() => getCurrentWindow(), [])
  useEffect(() => {
    window.theme().then((theme) => {
      setTheme(theme || 'auto')
    }).catch((e) => {
      console.warn(e)
      setTheme('auto')
    })
  }, [window])
  useEffect(() => {
    theme && window.setTheme(theme === 'auto' ? null : theme)
  }, [theme, window])
  const themeConfig = useMemo(() => {
    if (!theme) {
      return null
    }

    return (
      <RadioGroup value={theme} defaultValue="auto" onChange={value => setTheme(value as Theme | 'auto')} className="mt-2 flex items-center gap-4">
        {THEMES.map(item => (
          <Radio key={item.label} value={item.label.toLocaleLowerCase()} className="!data-[checked]:(bg-blue-600 text-white) flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors data-[active]:bg-gray-300 data-[hover]:bg-gray-200 dark:bg-gray-700 dark:data-[hover]:bg-gray-600">
            {item.icon}
            {' '}
            {item.label}
          </Radio>
        ))}
      </RadioGroup>
    )
  }, [theme])

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-gray-100 p-4 transition-all hover:shadow-md dark:bg-gray-800">
        <label className="text-base" htmlFor="config-directory">Theme</label>
        <div id="config-directory" className="mt-1 text-sm text-neutral-500">
          {' '}
          {themeConfig}
        </div>
      </div>
    </div>
  )
}
