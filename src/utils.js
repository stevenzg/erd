export const conf = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10
}

export const decodeEntities = function (text) {
  let txt = text

  txt = txt.replace(/ﬂ°°/g, function () {
    return '&#'
  })
  txt = txt.replace(/ﬂ°/g, function () {
    return '&'
  })
  txt = txt.replace(/¶ß/g, function () {
    return ';'
  })

  return txt
}