const path = require('path')
const puppeteer = require('puppeteer')

const erd = async (modelsText) => {
  const browser = await puppeteer.launch({})
  const page = await browser.newPage()
  // let width = 800
  // let height = 600
  // page.setViewport({ width, height })
  console.log(`file://${path.join(__dirname)}`)
  await page.goto(`file://${path.join(__dirname, './dist/erd.html')}`)

  const ret = await page.evaluate(modelsText => {
    document.querySelector('#erd').innerHTML = modelsText
    window.generateERD()
    return modelsText
  }, modelsText)

  await page.screenshot({ path: 'erd.png' })

  await browser.close()
}

module.exports = erd
