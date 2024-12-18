import { Radio, RadioGroup } from '@nextui-org/react'
import { getCurrentWindow, type Theme } from '@tauri-apps/api/window'
import { useEffect, useState } from 'react'

export default function Appearance() {
  const [theme, setTheme] = useState<Theme | 'auto'>('auto')
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(media.matches ? 'dark' : 'light')
  }, [])
  useEffect(() => {
    getCurrentWindow().setTheme(theme === 'auto' ? null : theme)
  }, [theme])

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup label="Theme" orientation="horizontal" value={theme} onValueChange={theme => setTheme(theme as Theme | 'auto')}>
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
        <Radio value="auto">Auto</Radio>
      </RadioGroup>
    </div>
  )
}
