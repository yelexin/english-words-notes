const puppeteer = require('puppeteer')

function go(word) {
  return new Promise(async function (resolve, reject) {
    try {
      let browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        headless: true,
      })
      let page = await browser.newPage()
      await page.goto('http://dict.youdao.com/w/' + word)
      let txt = await page.evaluate(() => {
        let m = []
        let i = 1
        let collins = document.querySelector('.collinsToggle')
        if (collins) {
          for (let j = 0; j < collins.children.length; j++) {
            collins.children[j].classList.remove('wt-collapse')
          }
          return collins.innerText
        } else {
          if (document.querySelector('#phrsListTab > div > ul > li')) {
            return document.querySelector('#phrsListTab > div > ul > li').innerText

          } else {
            return 'no'
          }
        }
      })
      browser.close()
      resolve(txt)
    } catch (e) {
      console.log('oops', e)
    }
  })
}

module.exports = go