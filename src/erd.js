import dagre from 'dagre-layout'
import graphlib from 'graphlibrary'
import * as d3 from 'd3'
import analysisText from './analysisModels'
import insertMarkers from './insertMarkers'
import drawClass from './drawClass'
import drawEdge from './drawEdge'
import { conf, decodeEntities } from './utils'
import './erd.css'

const idCache = {}

const getGraphId = function (label) {
  const keys = Object.keys(idCache)

  for (let i = 0; i < keys.length; i++) {
    if (idCache[keys[i]].label === label) {
      return keys[i]
    }
  }

  return undefined
}

function generateERD() {
  let element2Transfer = document.querySelector('#erd')
  let modelText = element2Transfer.innerHTML
  element2Transfer.setAttribute('data-processed', true)
  element2Transfer.innerHTML = ''

  const id = `mermaid-${Date.now()}`

  d3.select(element2Transfer).append('div')
  .attr('id', 'd' + id)
  .append('svg')
  .attr('id', id)
  .attr('width', '100%')
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  .append('g')


  const diagram = d3.select(`[id="${id}"]`)
  
  insertMarkers(diagram)

  // Layout graph, Create a new directed graph
  const g = new graphlib.Graph({
    multigraph: true
  })

  // Set an object for the graph label
  g.setGraph({
    isMultiGraph: true
  })

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function () {
    return {}
  })

  const { models, relations } = analysisText(modelText)

  const keys = Object.keys(models)
  for (let i = 0; i < keys.length; i++) {
    const classDef = models[keys[i]]
    const node = drawClass(diagram, classDef)
    console.log('node.id::', node.id)
    idCache[node.id] = node
    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.
    g.setNode(node.id, node)
  }

  // const relations = analysisRelations

  relations.forEach(function (relation) {
    g.setEdge(getGraphId(relation.id1), getGraphId(relation.id2), { relation: relation })
  })
  dagre.layout(g)
  g.nodes().forEach(function (v) {
    if (typeof v !== 'undefined' && g.node(v)) {
      d3.select('#' + v).attr('transform', 'translate(' + (g.node(v).x - (g.node(v).width / 2)) + ',' + (g.node(v).y - (g.node(v).height / 2)) + ' )')
    }
  })
  g.edges().forEach(function (e) {
    drawEdge(diagram, g.edge(e), g.edge(e).relation)
  })

  diagram.attr('height', '100%')
  diagram.attr('width', '100%')
  diagram.attr('viewBox', '0 0 ' + (g.graph().width + 20) + ' ' + (g.graph().height + 20))

  // d3.select(`[id="${id}"]`).selectAll('foreignobject > *').attr('xmlns', 'http://www.w3.org/1999/xhtml')

  // let url = ''
  // if (conf.arrowMarkerAbsolute) {
  //   url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search
  //   url = url.replace(/\(/g, '\\(')
  //   url = url.replace(/\)/g, '\\)')
  // }

  // // Fix for when the base tag is used
  // let svgCode = d3.select('#d' + id).node().innerHTML.replace(/url\(#arrowhead/g, 'url(' + url + '#arrowhead', 'g')

  // svgCode = decodeEntities(svgCode)

  // if (typeof cb !== 'undefined') {
  //   cb(svgCode, flowDb.bindFunctions)
  // } else {
  //   logger.warn('CB = undefined!')
  // }

  // const node = d3.select('#d' + id).node()
  // if (node !== null && typeof node.remove === 'function') {
  //   d3.select('#d' + id).node().remove()
  // }

  // element2Transfer.innerHTML = svgCode
}

window.generateERD = generateERD