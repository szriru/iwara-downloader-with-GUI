const axios = require('axios').default;
const jsdom = require("jsdom")

const { JSDOM } = jsdom;

// get max pager counter
const getPagerCount = (dom: typeof JSDOM): number => {
    const pagerItems = dom.window.document.querySelectorAll('.pager-item')
    let pagerNums= []
    let maxPagerNum = 1
    for (const pagerItem of pagerItems) {
        pagerNums.push(parseInt(pagerItem.querySelector('a').textContent))
    }
    maxPagerNum = Math.max(...pagerNums)
    return maxPagerNum
}

// get video page urls in 1 pager.
const getVideoPageUrls = (dom: typeof JSDOM): string[] => {
    let videoPageUrls = []
    const contents_rows = dom.window.document.querySelectorAll('.view-content .views-row')
    for (const row of contents_rows) {
        const cols = row.querySelectorAll('.views-column')
        for (const col of cols) {
            const videoPageLink = col.querySelector('.title > a')
            const videoPageUrl = "http://ecchi.iwara.tv" + videoPageLink.getAttribute("href")
            videoPageUrls.push(videoPageUrl)
        }
    }
    return videoPageUrls
}

// Sleep(1000) => sleep 1 sec
const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// get video page urls in all pager.
const getAllVideoPageUrls = async (userPageUrl: string): Promise<string[]> => {
    console.log('start getAllVideoPageUrls from libs ==>')
    let res = null
    let allVideoPageUrls = []

    // Need to add some codes if not desired url
    userPageUrl = userPageUrl.split('?')[0]
    userPageUrl = userPageUrl + "/videos"

    res = await axios.get(userPageUrl, {
        headers: {
            Host: 'ecchi.iwara.tv'
        }
    })
      .catch((err: Error)=> {throw err})

    const dom = new JSDOM(res.data)

    // Initialization.
    // same meaning to [...allVideoPageUrls, ...getVideoPageUrls(dom)]
    allVideoPageUrls = getVideoPageUrls(dom)

    // Search videos url in all pager except 1st page. Already got 1st page to search pagers, so don't want to request unnecessary one.
    const pagerCount = getPagerCount(dom)

    if (pagerCount > 1) {
        for (let i = 1; i < pagerCount; i++) {
            // Sleep for not getting banned for too many request.
            await sleep(1000)
            res = await axios.get(userPageUrl + "?page=" + i, {
                headers: {
                    Host: 'ecchi.iwara.tv'
                }
            })
            const dom_page = new JSDOM(res.data)
            allVideoPageUrls = [...allVideoPageUrls, ...getVideoPageUrls(dom_page)]
        }
    }

    console.log('==> end getAllVideoPageUrls from libs')

    return await allVideoPageUrls
}

export default getAllVideoPageUrls


