import * as d3 from 'd3'
import { conf } from './utils'

let edgeCount = 0
const relationType = {
  AGGREGATION: 0,
  EXTENSION: 1,
  COMPOSITION: 2,
  DEPENDENCY: 3
}

const drawEdge = function (elem, path, relation) {
  const getRelationType = function (type) {
    switch (type) {
      case relationType.AGGREGATION:
        return 'aggregation'
      case relationType.EXTENSION:
        return 'extension'
      case relationType.COMPOSITION:
        return 'composition'
      case relationType.DEPENDENCY:
        return 'dependency'
    }
  }

  // The data for our line
  const lineData = path.points

  // This is the accessor function we talked about above
  const lineFunction = d3.line()
    .x(function (d) {
      return d.x
    })
    .y(function (d) {
      return d.y
    })
    .curve(d3.curveBasis)

  const svgPath = elem.append('path')
    .attr('d', lineFunction(lineData))
    .attr('id', 'edge' + edgeCount)
    .attr('class', 'relation')
  let url = ''
  if (conf.arrowMarkerAbsolute) {
    url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search
    url = url.replace(/\(/g, '\\(')
    url = url.replace(/\)/g, '\\)')
  }

  if (relation.relation.type1 !== 'none') {
    svgPath.attr('marker-start', 'url(' + url + '#' + getRelationType(relation.relation.type1) + 'Start' + ')')
  }
  if (relation.relation.type2 !== 'none') {
    svgPath.attr('marker-end', 'url(' + url + '#' + getRelationType(relation.relation.type2) + 'End' + ')')
  }

  let x, y
  const l = path.points.length
  if ((l % 2) !== 0) {
    const p1 = path.points[Math.floor(l / 2)]
    const p2 = path.points[Math.ceil(l / 2)]
    x = (p1.x + p2.x) / 2
    y = (p1.y + p2.y) / 2
  } else {
    const p = path.points[Math.floor(l / 2)]
    x = p.x
    y = p.y
  }

  if (typeof relation.title !== 'undefined') {
    const g = elem.append('g')
      .attr('class', 'classLabel')
    const label = g.append('text')
      .attr('class', 'label')
      .attr('x', x)
      .attr('y', y)
      .attr('fill', 'red')
      .attr('text-anchor', 'middle')
      .text(relation.title)

    window.label = label
    const bounds = label.node().getBBox()

    g.insert('rect', ':first-child')
      .attr('class', 'box')
      .attr('x', bounds.x - conf.padding / 2)
      .attr('y', bounds.y - conf.padding / 2)
      .attr('width', bounds.width + conf.padding)
      .attr('height', bounds.height + conf.padding)
  }

  edgeCount++
}

export default drawEdge