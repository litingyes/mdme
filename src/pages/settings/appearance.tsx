import type { Theme } from '@tauri-apps/api/window'
import { Field, Fieldset, Label, Legend, Radio, RadioGroup } from '@headlessui/react'
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
          <Radio key={item.label} value={item.label.toLocaleLowerCase()} className="flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors data-[active]:bg-gray-300 data-[hover]:bg-gray-200 !data-[checked]:(bg-blue-600 text-white)">
            {item.icon}
            {' '}
            {item.label}
          </Radio>
        ))}
      </RadioGroup>
    )
  }, [theme])

  return (
    <Fieldset>
      <Legend className="text-xl">Appearance</Legend>
      <Field className="my-4">
        <Label>Theme</Label>
        {themeConfig}
      </Field>
    </Fieldset>
  )
}
