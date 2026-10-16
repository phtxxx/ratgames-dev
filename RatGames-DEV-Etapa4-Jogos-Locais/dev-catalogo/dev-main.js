'use strict';
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
app.setPath('userData', path.join(app.getPath('appData'), 'RatGames-DEV-Catalogo-Local'));
let main;
app.whenReady().then(() => {
  ipcMain.handle('dev:abrir-html-local', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(main, {
      title: 'Escolher um jogo HTML local para testar',
      properties: ['openFile'], filters: [{ name: 'Jogos HTML', extensions: ['html','htm'] }]
    });
    if (canceled || !filePaths.length) return { canceled: true };
    const file = filePaths[0];
    if (!fs.existsSync(file) || !/\.html?$/i.test(file)) return { error: 'Selecione um arquivo HTML existente.' };
    const win = new BrowserWindow({width: 1100, height: 760, title: 'Jogo local — RAT Games DEV',
      backgroundColor:'#101118', webPreferences: {nodeIntegration:false, contextIsolation:true, sandbox:true, webSecurity:true}});
    await win.loadFile(file);
    return { opened: true, name: path.basename(file) };
  });
  main = new BrowserWindow({width:1200,height:780,minWidth:850,minHeight:540,
    backgroundColor:'#111218',webPreferences:{preload:path.join(__dirname,'dev-preload.js'),nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}});
  main.loadFile(path.join(__dirname,'index.html'));
});
app.on('window-all-closed', () => app.quit());
