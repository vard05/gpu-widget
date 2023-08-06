const electron = require('electron')
const url = require('url')
const path = require('path')
const { app, BrowserWindow, ipcMain } = electron
const open = require('open');

let mainWindow

//INITIALIZATION ENDED

ipcMain.handle('Open', async (event, ...args) => {
    open(args[0])
})

app.on('ready', function () {
    ipcMain.on('CloseClick', () => CloseApp())
    ipcMain.on('MinClick', () => MinApp())

    mainWindow = new BrowserWindow({
        width: 970,
        minWidth: 970,
        height: 592,
        minHeight: 592,
        show: false,
        frame: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            nodeIntegrationInSubFrames: true,
            webviewTag: true,
            nodeIntegration: true,
            experimentalFeatures: true,
        },
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'src/mainWindow.html'),
            protocol: 'file:',
            slashes: true,
        })
    )

    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow.show()
    })

    mainWindow.removeMenu()
    mainWindow.webContents.openDevTools();
})

function CloseApp() {
    mainWindow.close()
}

function MinApp() {
    mainWindow.minimize()
}