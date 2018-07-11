import { INode } from './node.type';

export interface ITree {
  root: INode
  [propName: string]: INode
}
