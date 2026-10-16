'use strict';
const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('devLocal',Object.freeze({abrirHtml:()=>ipcRenderer.invoke('dev:abrir-html-local')}));
