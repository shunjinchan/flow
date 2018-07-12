import db from '../db'
import { INode } from '../types/node.type'

export function getTree() {
  const root: INode = { text: 'Home', id: 'root', childIds: [], parentId: '' }
  const tree = {}

  if (
    !db.has('tree').value() ||
    db
      .get('tree')
      .find({ id: 'root' })
      .value() === undefined
  ) {
    // 用数组的数据结构存储到 localstorage
    db.defaults({
      tree: [root]
    }).write()
  }

  db.getState().tree.forEach((node: INode) => {
    tree[node.id] = node
  })

  return tree
}

export function createNode(node: INode) {
  db.get('tree')
    .push(node)
    .write()
}

export function destoryNode(id: string) {
  db.get('tree').remove({ id }).write()
}
