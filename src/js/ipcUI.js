const { ipcRenderer } = require('electron')

async function CloseApp() {
    ipcRenderer.send('CloseClick')
}

async function MinApp() {
    ipcRenderer.send('MinClick')
}

async function Open(url) {
    await ipcRenderer.invoke('Open', url)
}

async function CopyValue(e) {
    mdtoast.info('📋 скопировано', { position: 'bottom center' })
    await navigator.clipboard.writeText(e.innerHTML)
}