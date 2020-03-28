const {app, BrowserWindow} = require("electron");
const url = require("url");
const path = require("path");

let appWindow;

function initWindow() {
    appWindow = new BrowserWindow({
        center: true,
        height: 800,
        width: 1000,
        webPreferences:{
            nodeIntegration: true
        }
    })

    appWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, '/dist/index.html'),
            protocol: "file",
            slashes: true
        })
    )

    appWindow.on("closed", ()=>appWindow = null)
}

app.on("ready", initWindow);

app.on("window-all-closed", () => {
    if(process.platform != 'darwin'){
        app.quit()
    }
})

app.on('activate', () =>{
    if(appWindow === null)initWindow();
})