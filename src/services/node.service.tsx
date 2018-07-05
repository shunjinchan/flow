import * as shortid from 'shortid'
import db from '../db'
import { INode } from '../types/node.type'

export function createNode(node: INode) {
  db.get('tree')
    .push(node)
    .write()
}

export function updateText(id: string, text: string) {
  db.get('tree')
    .find({ id })
    .assign({ id, text })
    .write()
}

export function getTree(): {} {
  const root: INode = { text: 'Home', id: 'root', childIds: [], parentId: '' }
  const tree = {}

  if (
    !db.has('tree').value() ||
    db
      .get('tree')
      .find({ id: 'root' })
      .value() === undefined
  ) {
    db.defaults({
      tree: [root]
    }).write()
  }

  db.getState().tree.forEach((node: INode) => {
    tree[node.id] = node
  })

  return tree
}
