import { CREATE_NODE, DESTORT_NODE } from '../actions/tree.action'
import { INode } from '../types/node.type'
import { ITree } from '../types/tree.type';

interface IAction {
  type: string
  id: string
  childId: string
  parentId: string
}

const treeReducer = (state: ITree, action: IAction): ITree => {
  switch (action.type) {
    case DESTORT_NODE:
      delete state[action.id]
      return {
        ...state
      }
    case CREATE_NODE:
      const node: INode = {
        childIds: [],
        id: action.id,
        parentId: action.parentId,
        text: ''
      }
      return Object.assign({}, state, {
        [node.id]: node
      })
    default:
      return state
  }
}

export { treeReducer }
