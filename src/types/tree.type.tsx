import { INode } from './node.type';

/**
 * 树数据额结构
 */
export interface ITree {
  root: INode
  [propName: string]: INode
}
