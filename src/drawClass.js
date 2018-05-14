import { conf } from './utils'

let classCnt = 0
/**
 * 
 * @param {*} elem 
 * @param {*} classDef methods members 
 */
const drawClass = function (elem, classDef) {
  const addTspan = function (textEl, txt, isFirst) {
    const tSpan = textEl.append('tspan')
      .attr('x', conf.padding)
      .text(txt)
    if (!isFirst) {
      tSpan.attr('dy', conf.textHeight)
    }
  }

  const id = 'classId' + classCnt
  const classInfo = {
    id: id,
    label: classDef.id,
    width: 0,
    height: 0
  }

  const g = elem.append('g')
    .attr('id', id)
    .attr('class', 'classGroup')
  const title = g.append('text')
    .attr('x', conf.padding)
    .attr('y', conf.textHeight + conf.padding)
    .text(classDef.id)

  const titleHeight = title.node().getBBox().height

  const membersLine = g.append('line') // text label for the x axis
    .attr('x1', 0)
    .attr('y1', conf.padding + titleHeight + conf.dividerMargin / 2)
    .attr('y2', conf.padding + titleHeight + conf.dividerMargin / 2)

  const members = g.append('text') // text label for the x axis
    .attr('x', conf.padding)
    .attr('y', titleHeight + (conf.dividerMargin) + conf.textHeight)
    .attr('fill', 'white')
    .attr('class', 'classText')

  let isFirst = true
  classDef.members.forEach(function (member) {
    addTspan(members, member, isFirst)
    isFirst = false
  })

  const membersBox = members.node().getBBox()

  const methodsLine = g.append('line') // text label for the x axis
    .attr('x1', 0)
    .attr('y1', conf.padding + titleHeight + conf.dividerMargin + membersBox.height)
    .attr('y2', conf.padding + titleHeight + conf.dividerMargin + membersBox.height)

  const methods = g.append('text') // text label for the x axis
    .attr('x', conf.padding)
    .attr('y', titleHeight + 2 * conf.dividerMargin + membersBox.height + conf.textHeight)
    .attr('fill', 'white')
    .attr('class', 'classText')

  // isFirst = true

  // classDef.methods.forEach(function (method) {
  //   addTspan(methods, method, isFirst)
  //   isFirst = false
  // })

  const classBox = g.node().getBBox()
  g.insert('rect', ':first-child')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', classBox.width + 2 * conf.padding)
    .attr('height', classBox.height + conf.padding + 0.5 * conf.dividerMargin)

  membersLine.attr('x2', classBox.width + 2 * conf.padding)
  methodsLine.attr('x2', classBox.width + 2 * conf.padding)

  classInfo.width = classBox.width + 2 * conf.padding
  classInfo.height = classBox.height + conf.padding + 0.5 * conf.dividerMargin

  classCnt++
  return classInfo
}

export default drawClass