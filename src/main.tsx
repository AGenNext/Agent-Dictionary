import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { saveFile, listFiles, readFile } from './system/fs'

type AppId = 'terminal' | 'files' | 'notes'

type WindowState = {
  id: string
  app: AppId
  title: string
  x: number
  y: number
  z: number
}

const bootWindows: WindowState[] = [
  { id: 'terminal-1', app: 'terminal', title: 'Terminal', x: 80, y: 90, z: 2 },
  { id: 'files-1', app: 'files', title: 'Files', x: 420, y: 130, z: 1 }
]

function App() {
  const [windows, setWindows] = useState(bootWindows)
  const [topZ, setTopZ] = useState(3)

  const openApp = (app: AppId) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows((items) => [
      ...items,
      {
        id: `${app}-${Date.now()}`,
        app,
        title: app[0].toUpperCase() + app.slice(1),
        x: 120 + items.length * 28,
        y: 100 + items.length * 24,
        z: nextZ
      }
    ])
  }

  const focus = (id: string) => {
    const nextZ = topZ + 1
    setTopZ(nextZ)
    setWindows((items) => items.map((w) => (w.id === id ? { ...w, z: nextZ } : w)))
  }

  const close = (id: string) => setWindows((items) => items.filter((w) => w.id !== id))

  return (
    <main className="desktop">
      <section className="hero">
        <p className="eyebrow">Browser as computer</p>
        <h1>BrowserOS</h1>
        <p>Tabs become processes. IndexedDB becomes disk. Workers and WASM come next.</p>
      </section>

      <div className="dock">
        <button onClick={() => openApp('terminal')}>Terminal</button>
        <button onClick={() => openApp('files')}>Files</button>
        <button onClick={() => openApp('notes')}>Notes</button>
      </div>

      {windows.map((window) => (
        <Window key={window.id} window={window} onFocus={focus} onClose={close} />
      ))}
    </main>
  )
}

function Window({ window, onFocus, onClose }: { window: WindowState; onFocus: (id: string) => void; onClose: (id: string) => void }) {
  const style = useMemo(() => ({ left: window.x, top: window.y, zIndex: window.z }), [window])

  return (
    <section className="window" style={style} onMouseDown={() => onFocus(window.id)}>
      <header className="titlebar">
        <span>{window.title}</span>
        <button onClick={() => onClose(window.id)}>×</button>
      </header>
      <div className="content">
        {window.app === 'terminal' && <TerminalApp />}
        {window.app === 'files' && <FilesApp />}
        {window.app === 'notes' && <NotesApp />}
      </div>
    </section>
  )
}

function TerminalApp() {
  const [log, setLog] = useState<string[]>(['BrowserOS shell', 'Try: help, ls, cat /hello.txt, write /note.txt hello'])
  const [input, setInput] = useState('')

  async function run(command: string) {
    const [cmd, path, ...rest] = command.trim().split(' ')
    if (!cmd) return
    if (cmd === 'help') return setLog((l) => [...l, `$ ${command}`, 'commands: help, ls, cat <path>, write <path> <text>'])
    if (cmd === 'ls') return setLog((l) => [...l, `$ ${command}`, ...(await listFiles())])
    if (cmd === 'cat' && path) return setLog((l) => [...l, `$ ${command}`, (await readFile(path)) ?? 'file not found'])
    if (cmd === 'write' && path) {
      await saveFile(path, rest.join(' '))
      return setLog((l) => [...l, `$ ${command}`, `saved ${path}`])
    }
    setLog((l) => [...l, `$ ${command}`, `unknown command: ${cmd}`])
  }

  return (
    <div className="terminal">
      <pre>{log.join('\n')}</pre>
      <form onSubmit={(e) => { e.preventDefault(); run(input); setInput('') }}>
        <span>$</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
      </form>
    </div>
  )
}

function FilesApp() {
  const [files, setFiles] = useState<string[]>([])
  const refresh = async () => setFiles(await listFiles())
  return <div><button onClick={refresh}>Refresh disk</button><ul>{files.map((f) => <li key={f}>{f}</li>)}</ul></div>
}

function NotesApp() {
  const [text, setText] = useState('')
  return <textarea className="notes" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write notes here..." />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
