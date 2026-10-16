'use strict';
const { app, BrowserWindow } = require('electron');
const path = require('path');
app.setPath('userData', path.join(app.getPath('appData'), 'RatGames-DEV-Catalogo-Local'));
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 1200, height: 780, minWidth: 850, minHeight: 540, backgroundColor: '#111218', webPreferences: {nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true} });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.on('closed', () => app.quit());
});
app.on('window-all-closed', () => app.quit());
