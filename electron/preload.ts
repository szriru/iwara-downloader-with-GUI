import { ipcRenderer, contextBridge } from 'electron';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

// ========= For AppBar ==========
const api = {
  Minimize: () => {
    ipcRenderer.send('minimize');
  },
  Maximize: () => {
    ipcRenderer.send('maximize');
  },
  Close: () => {
    ipcRenderer.send('close');
  },
};
// ===============================


const dlApi = {
  getAllVideoPageUrls: async (_userPageUrl: string) => {
    const res = await ipcRenderer.invoke('getAllVideoPageUrls', _userPageUrl);
    return res
  },

  executeDlVideo: async (_videoPageUrl: string, _quality: string, _saveDir: string): Promise<boolean> => {
    const dlStatus = await ipcRenderer.invoke('exe:dlVideo', _videoPageUrl, _quality, _saveDir)
    return dlStatus
  },

  reqSaveDir: async () => {
    const res = await ipcRenderer.invoke('req:saveDir')
    return res
  },

  isSaveDirSet: async (_saveDir: string) => {
    const isSaveDirSet = await ipcRenderer.invoke('popError:saveDir', _saveDir)
    return isSaveDirSet
  },

  receiveDlProgress: (cb: any) => {
    ipcRenderer.on('receive:dlProgress', cb)
  },

  removeDlProgressListener: () => {
    ipcRenderer.removeAllListeners('receive:dlProgress')
  }
}

contextBridge.exposeInMainWorld('Main', api);
contextBridge.exposeInMainWorld('dlApi', dlApi);

/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 * contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
**/
