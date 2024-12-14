import { useSettings } from '@/hooks/useSettings'
import { open } from '@tauri-apps/plugin-dialog'

export default function SettingsStorage() {
  const { dataDir, documentsDir, setDocumentsDir } = useSettings()

  const toChangeDocumentsDir = () => {
    open({
      canCreateDirectories: true,
      defaultPath: documentsDir,
      directory: true,
      multiple: false,
      title: 'Change the documents directory',
    }).then((path) => {
      path && setDocumentsDir(path)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-gray-100 p-4 transition-all dark:bg-gray-800 hover:shadow-md">
        <label className="text-base" htmlFor="config-directory">Config directory</label>
        <div id="config-directory" className="mt-1 text-sm text-neutral-500">{dataDir}</div>
      </div>
      <div className="relative rounded-lg bg-gray-100 p-4 transition-all dark:bg-gray-800 hover:shadow-md">
        <label className="text-base" htmlFor="documents-directory">Documents directory</label>
        <div id="documents-directory" className="mt-1 text-sm text-neutral-500">{documentsDir}</div>
        <button className="absolute right-2 top-2 size-6 flex items-center justify-center rounded-lg p-1 text-base transition-all hover:bg-gray-200 dark:hover:bg-gray-700" type="button" onClick={() => toChangeDocumentsDir()}>
          <i className="i-mdi:edit-outline" />
        </button>
      </div>
    </div>
  )
}
