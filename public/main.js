const { app, BrowserWindow } = require("electron");
const dotenv = require("dotenv");
const path = require("path");
const url = require("url");

dotenv.config();

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  console.log("process.env.ELECTRON_START_URL", process.env.ELECTRON_START_URL);
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "build", "index.html"),
      protocol: "file:",
      slashes: true,
    });

  console.log("startUrl", startUrl);
  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
