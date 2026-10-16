'use strict';
const {app, BrowserWindow, dialog} = require('electron');
const path = require('node:path');
const fs = require('node:fs');
app.commandLine.appendSwitch('disable-http-cache');
function createWindow() {
 const win = new BrowserWindow({
  width: 1080,height: 760,minWidth: 680,minHeight: 520,
  backgroundColor:'#101828',title:'RAT Games DEV — Arena Local',
  webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}
 });
 win.removeMenu();
 win.loadFile(path.join(__dirname,'index.html'));
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',(e)=>e.preventDefault());
 win.webContents.on('did-fail-load',(_e,code,desc)=>dialog.showErrorBox('Erro ao abrir jogo',code+': '+desc));
}
app.whenReady().then(()=>{
 createWindow();
 app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
