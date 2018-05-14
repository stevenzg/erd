const analysisText = (modelsText) => {
  let textArray = modelsText.split('\n')
  console.log('textArray::', textArray)

  let seperators = ['#', '[']
  let models = {}
  let currentModelKey

  for (let i = 0, len = textArray.length; i < len; i++) {
    let textItem = textArray[i]
    let firstLetter = textItem.substr(0, 1)
    if (i === 0 || textItem === '') {

    } else if (['#', '['].indexOf(firstLetter) === -1) {
      let a = textItem.split(' ')
      console.log('111:', a.length, a)
      if(textItem !== '') {
        let keyVal = textItem.split(/(.+)\s(.+)/)
        console.log('2222::', keyVal[0], keyVal[1])
        models[currentModelKey].members.push(textItem)
      }
    } else if (firstLetter === '#') {
      
    } else if (firstLetter === '[') {
      currentModelKey = textItem
      models[textItem] = {
        id: textItem,
        members: []
      }
    }
  }

  console.log('models::', models)

  return models
}

export default analysisText