import * as shortid from 'shortid'
import db from '../db'

// export function addNode({ html }: { html: string }): string {
//   const id = shortid.generate()
//   db.get('tree')
//     .assign({ id, html })
//     .write()
//   return id
// }

export function updateNode({ id, html }: { id: string; html: string }) {
  db.get('tree')
    .find({ id })
    .assign({ id, html })
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
        root: { html: 'Home', id: 'root', childIds: [], parentId: '' }
      }
    }).write()
  }
  return db.getState().tree
}
