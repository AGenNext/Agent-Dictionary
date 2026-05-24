import Dexie, { Table } from 'dexie'

interface FileRecord {
  id?: number
  path: string
  content: string
}

class BrowserOSDB extends Dexie {
  files!: Table<FileRecord>

  constructor() {
    super('browser-os')
    this.version(1).stores({
      files: '++id,path'
    })
  }
}

const db = new BrowserOSDB()

export async function saveFile(path: string, content: string) {
  const existing = await db.files.where('path').equals(path).first()

  if (existing?.id) {
    await db.files.update(existing.id, { content })
    return
  }

  await db.files.add({ path, content })
}

export async function readFile(path: string) {
  const file = await db.files.where('path').equals(path).first()
  return file?.content
}

export async function listFiles() {
  const files = await db.files.toArray()
  if (!files.length) {
    await saveFile('/hello.txt', 'Welcome to BrowserOS filesystem')
    return ['/hello.txt']
  }
  return files.map((f) => f.path)
}
