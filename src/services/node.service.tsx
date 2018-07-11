import * as shortid from 'shortid'
import db from '../db'
import { INode } from '../types/node.type'

export function updateText(id: string, text: string) {
  db.get('tree')
    .find({ id })
    .assign({ text })
    .write()
}

export function addChild(id: string, childId: string) {
  const value: any = db
    .get('tree')
    .find({ id })
    .value()
  const childIds = value.childIds
  childIds.push(childId)
  db.get('tree')
    .find({ id })
    .assign({ childIds })
    .write()
}
