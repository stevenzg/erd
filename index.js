const path = require('path')
const puppeteer = require('puppeteer')

const erd = async ({modelsText, outputType = 'png'}) => {
  const browser = await puppeteer.launch({})
  const page = await browser.newPage()
  let width = 800
  let height = 600
  page.setViewport({ width, height })
  await page.goto(`file://${path.join(__dirname, './dist/erd.html')}`)

  const ret = await page.evaluate(modelsText => {
    document.querySelector('#erd').innerHTML = modelsText
    window.generateERD()
    return modelsText
  }, modelsText)

  const clip = await page.$eval('svg', svg => {
    const react = svg.getBoundingClientRect()
    return { x: react.left, y: react.top, width: react.width, height: react.height }
  })
  let backgroundColor = 'white'
  switch (outputType) {
    case 'png':
      await page.screenshot({ path: 'erd.png', clip, omitBackground: backgroundColor === 'transparent' })
      break
    case 'pdf':
      await page.pdf({ path: 'erd.pdf', printBackground: backgroundColor !== 'transparent' })
      break
    case 'html':
        break
  }

  await browser.close()
}

module.exports = erd
