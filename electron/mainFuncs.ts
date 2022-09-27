import { ipcMain, dialog } from 'electron';
import getAllVideoPageUrls from "./libs/getAllVideoPageUrls"
import getFileUrl from "./libs/getFileUrl"
import downloadFile from "./libs/downloadFile"

ipcMain.handle('getAllVideoPageUrls', async (_, userPageUrl: string) => {
    console.log('start ipcMain.handle getAllVideoPageUrls ==>')

    const allVideoPageUrls = await getAllVideoPageUrls(userPageUrl)
        .catch(err => {throw new Error(err)})

    console.log(allVideoPageUrls)

    console.log('==> end ipcMain.handle getAllVideoPageUrls')

    return allVideoPageUrls
})

ipcMain.handle('popError:saveDir', (_, saveDir): boolean => {
    console.log('start ipcMain.handle popError:saveDir ==>')

    if(saveDir === ""){
        dialog.showErrorBox("Error", "Set save location.")
        return false
    }

    console.log('==> end ipcMain.handle popError:saveDir')
    return true
}) 

ipcMain.handle('req:saveDir', async (_) => {
    console.log('start ipcMain.handle req:saveDir ==>')

    const files: any = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })

    console.log('==> end ipcMain.handle req:saveDir')

    return files.filePaths[0]
})

ipcMain.handle('exe:dlVideo', async (e, videoPageUrl, quality, saveDir): Promise<boolean> => {
    console.log('start ipcMain.on send:downloadVideo ==>')
    let fileUrl = await getFileUrl(videoPageUrl, quality)
    fileUrl = "https:" + fileUrl;
    
    let fileName: string = videoPageUrl.split("/").at(-1)
    fileName = fileName + ".mp4"

    const status = await downloadFile(e, fileUrl, fileName, saveDir)
        .catch((err) => {throw err})

    console.log('==> end ipcMain.on send:downloadVideo')
    return status
})