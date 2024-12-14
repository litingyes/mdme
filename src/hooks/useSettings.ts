import { appDataDir, appLocalDataDir } from '@tauri-apps/api/path'
import { Store } from '@tauri-apps/plugin-store'
import { useEffect, useState } from 'react'

export function useSettings() {
  const [store, setStore] = useState<Store>()
  const clearStore = () => {
    store?.clear()
  }

  const [dataDir, setDataDir] = useState('')
  const [documentsDir, setDocumentsDir] = useState('')

  useEffect(() => {
    appDataDir().then(path => [
      setDataDir(path),
    ])
    Store.load('settings.json').then((store) => {
      setStore(store)
    })
  }, [])
  useEffect(() => {
    store?.get('documents-dir').then((path) => {
      if (path) {
        setDocumentsDir(path as string)
        return
      }

      appLocalDataDir().then((path) => {
        setDocumentsDir(path)
      })
    })
  }, [store])
  useEffect(() => {
    store?.set('documents-dir', documentsDir)
  }, [store, documentsDir])

  return {
    setStore,
    clearStore,

    dataDir,
    setDataDir,

    documentsDir,
    setDocumentsDir,
  }
}
