const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
var iconpath = path.join(__dirname, 'assets/weather-icons/png/036-eclipse.png');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
    // Create the browser window.
    win = new BrowserWindow({
        width: 640,
        height: 300,
        resizable: false,
        frame: false,
        skipTaskbar: true,
        icon: path.join(__dirname, 'favicon.ico'),
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    var appIcon = new Tray(iconpath)

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit', click: function () {
                app.isQuiting = true
                app.quit()
            }
        }
    ])

    appIcon.setContextMenu(contextMenu)

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.on('minimize', function (event) {
        event.preventDefault()
        win.hide()
    });

    win.on('show', function () {
        appIcon.setHighlightMode('always')
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

const store = new Store();

ipcMain.on('saveUserPreferences', (event, arg) => {
    store.set('userPreferences', arg);
    event.returnValue = true;
})

ipcMain.on('loadUserPreferences', (event, arg) => {
    event.returnValue = store.get('userPreferences');
})