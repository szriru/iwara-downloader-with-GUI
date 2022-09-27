import { BrowserWindow } from "electron";
import path from "path";

const Downloader = require('nodejs-file-downloader');

const downloadFile = async (e: any, fileUrl: string, fileName: string, saveDir: string): Promise<boolean> => {
    console.log('start downloadFile from libs ==>')

    let temp = 0
    const dir = path.relative(path.resolve(__dirname), saveDir)
    const webContents = e.sender
    const win: any = BrowserWindow.fromWebContents(webContents)

    const downloader = new Downloader({
        url: fileUrl,
        directory: dir,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        },
        onProgress: function (percentage: number) {
            // This onProgress function executes too frequent, and each of them make reactjs re-render. That causes cpu temperature high.
            // So do like this to make less reactjs render frequency.
            if((percentage - temp) > 5){
            win.send('receive:dlProgress', percentage)
            temp = percentage
            }
        },
        fileName: fileName,
        cloneFiles: true, // Create clone file if exists same file name.
        maxAttempts: 3, // Attempts if fails
        onError: function (error: ErrorEventInit) {
            console.log("Error from attempt ", error);
        },
        shouldStop: function (error: any) {
            if (error.statusCode && error.statusCode === 404) {
                return true;
            }
        },
    });
    try {
        const { filePath, downloadStatus } = await downloader.download();
        console.table({
            "download file": "done",
            "filePath ==>": filePath,
            "downloadStatu ==>": downloadStatus,
        })
        win.send('receive:dlProgress', 100)
    } catch (err) {
        throw err
    }
    console.log('==> end downloadFile from libs')
    return true;
}

export default downloadFile