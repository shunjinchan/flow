import { CREATE_NODE, DESTORT_NODE } from '../actions/tree.action'
import { INode } from '../types/node.type'
import { IStoreState } from '../types/store.type'
import { ITree } from '../types/tree.type';

interface IAction {
  type: string
  id: string
  childId: string
  parentId: string
}

const tree = (state: ITree, action: IAction): ITree => {
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
      // return {
      //   ...state,
      //   node
      // }
      return Object.assign({}, state, node)
    default:
      return state
  }
}

export default (state: IStoreState, action: IAction): IStoreState => {
  const { id } = action

  if (typeof id === 'undefined') {
    return state
  }

  return {
    ...state,
    tree: tree(state.tree, action)
  }
}
