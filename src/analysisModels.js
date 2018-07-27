const trim = (str) => {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
}

const analysisText = (modelsText) => {
  modelsText = trim(modelsText)
  let textArray = modelsText.split('\n')
  
  let seperators = ['#', '[']
  let models = {}
  let currentModelKey
  let isModelEnd = false
  let relations = []

  for (let i = 0, len = textArray.length; i < len; i++) {
    let textItem = trim(textArray[i])
    let firstLetter = textItem.substr(0, 1)
    if (['#', '['].indexOf(firstLetter) === -1) {
      let a = textItem.split(' ')
      if (textItem !== '') {
        if (!isModelEnd) {
          let keyVal = textItem.split(/(.+)\s(.+)/)
          // let attrModel = JSON.parse(keyVal[1])
          models[currentModelKey].members.push(textItem)
        } else {
          let relationData = textItem.split(/\s/)
          let relationType = relationData[1]
          switch(relationType) {
            case '*--*':
              relations.push({
                'id1': relationData[0],
                "id2": relationData[2],
                "relation":{
                  "type1": "none",
                  "type2": "none",
                  "lineType": 0
                },
                "relationTitle1":"none",
                "relationTitle2":"none",
                "title": ''
              })
              break
          }
        }
      }
    } else if (firstLetter === '[') {
      let modelName = textItem.match(/\[(.+)\]/)
      currentModelKey = modelName[1]
      models[currentModelKey] = {
        id: currentModelKey,
        members: []
      }
    } else if (textItem === '# Relationships') {
      isModelEnd = true
    }
  }

  return {
    models,
    relations
  }
}

export default analysisText
