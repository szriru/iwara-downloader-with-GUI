const puppeteer = require('puppeteer');

const getFileUrls = async (lis: any): Promise<Map<string, string>> => {
  let _fileUrls = new Map();
  for await (const li of lis) {
    const a = await li.$('a')
    const [quality, fileUrl] = await a.evaluate((el: any) => {
      return [
        el.textContent,
        el.getAttribute('href')
      ]
    }
    )
    _fileUrls.set(quality.trim(), fileUrl)
  }
  return _fileUrls
}

const getFileUrl = async (videoPageUrl: string, quality: string): Promise<string> => {
  console.log('start getFileUrl from libs ==>')
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://ecchi.iwara.tv/')
  await page.goto(videoPageUrl);
  await page.waitForSelector('#download-options li');

  const ul = await page.$("#download-options ul")
  const lis = await ul.$$("li")

  const fileUrls: Map<string, string> = await getFileUrls(lis)

  const fileUrl = fileUrls.get(quality)!
  if(fileUrl == undefined){
    throw new Error("there's no specified quality available")
  }

  console.log('==> end getFileUrl from libs')

  return fileUrl
}

export default getFileUrl