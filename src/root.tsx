import { SingletonDialog } from '@/components/singletonDialog'
import { NextUIProvider } from '@nextui-org/system'
import { useEffect } from 'react'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import '@unocss/reset/tailwind.css'
import '@/style/base.css'

export function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const html = document.documentElement

    if (media.matches) {
      html.classList.remove('light')
      html.classList.add('dark')
    }
    else {
      html.classList.add('light')
      html.classList.remove('dark')
    }

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        html.classList.remove('light')
        html.classList.add('dark')
      }
      else {
        html.classList.add('light')
        html.classList.remove('dark')
      }
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mdme</title>
        <Meta />
        <Links />
      </head>
      <body className="h-screen w-screen overflow-auto bg-gray-50 text-neutral-800 transition-colors dark:bg-gray-900 dark:text-neutral-100">
        <SingletonDialog>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </SingletonDialog>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
