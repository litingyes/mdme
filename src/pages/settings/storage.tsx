import { useSettings } from '@/hooks/useSettings'
import { Button, Input } from '@nextui-org/react'
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
      <Input label="Config directory" value={dataDir} type="url" isReadOnly />
      <Input
        label="Documents directory"
        value={documentsDir}
        type="url"
        isReadOnly
        endContent={(
          <Button size="sm" color="primary" variant="light" isIconOnly onPress={() => toChangeDocumentsDir()}>
            <i className="icon-[icon-park-outline--config] size-4" />
          </Button>
        )}
      />
    </div>
  )
}
