import * as shortid from 'shortid'
import db from '../db'

interface INode {
  text: string
}

export function addNode({ text }: INode): string {
  const id = shortid.generate()
  db.get('tree')
    .push({ id, text })
    .write()
  return id
}
