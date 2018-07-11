import { ITree } from './tree.type';

export interface IStoreState {
  tree: ITree
  [propName: string]: any
}
