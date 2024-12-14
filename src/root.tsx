import { SingletonDialog } from '@/components/singletonDialog'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

export function Layout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <body className="size-screen overflow-auto bg-gray-50 text-neutral-800 transition-colors dark:(bg-gray-900 text-neutral-100)">
        <SingletonDialog>
          {children}
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
