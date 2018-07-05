import * as shortid from 'shortid'
import db from '../db'

export function createNode({ text }: { text: string }): string {
  const id = shortid.generate()
  db.get('tree')
    .assign({ id, text })
    .write()
  return id
}

export function updateNode({ id, text }: { id: string; text: string }) {
  db.get('tree')
    .find({ id })
    .assign({ id, text })
    .write()
}

export function getTree(): {} {
  if (
    !db.has('tree').value() ||
    db
      .get('tree')
      .find({ id: 'root' })
      .value() === undefined
  ) {
    db.defaults({
      tree: {
        root: { text: 'Home', id: 'root', childIds: [], parentId: '' }
      }
    }).write()
  }
  return db.getState().tree
}
