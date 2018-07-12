import db from '../db'

export function updateText(id: string, text: string) {
  db.get('tree')
    .find({ id })
    .assign({ text })
    .write()
}

export function addChild(id: string, childId: string) {
  const value = db
    .get('tree')
    .find({ id })
    .value()
  const childIds: string[] = (value as any).childIds
  childIds.push(childId)
  db.get('tree')
    .find({ id })
    .assign({ childIds })
    .write()
}

export function removeChild(id: string, childId: string) {
  const value = db
    .get('tree')
    .find({ id })
    .value()
  const childIds: string[] = (value as any).childIds
  const index = childIds.indexOf(childId)
  childIds.splice(index, 1)
  db.get('tree')
    .find({ id })
    .assign({ childIds })
    .write()
}
