const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
var iconpath = path.join(__dirname, 'assets/weather-icons/png/036-eclipse.png')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
    // set timeout to render the window not until the Angular 
    // compiler is ready to show the project
    setTimeout(() => {
        // Create the browser window.
        win = new BrowserWindow({
            width: 640,
            height: 300,
            resizable: false,
            frame: false,
            skipTaskbar: true,
            webPreferences: {
                nodeIntegration: true
            },
            icon: './src/favicon.ico'
        });

        // and load the app.
        win.loadURL(url.format({
            pathname: 'localhost:4200',
            protocol: 'http:',
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
        
        //UNCOMMENT THIS TO SHOW DEV TOOLS
        //win.webContents.openDevTools();

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

    }, 10000);
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
    console.log(arg);
    store.set('userPreferences', arg);
    event.returnValue = true;
})

ipcMain.on('loadUserPreferences', (event, arg) => {
    console.log(arg);
    event.returnValue = store.get('userPreferences');
})