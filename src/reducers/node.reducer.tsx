import { ADD_CHILD, CREATE_NODE } from '../actions/node.action'
import { IStoreState } from '../types/store';

interface INode {
  id: string
  html: string
  parentId: string
  childIds: string[]
}

interface IAction {
  type: string
  id: string,
  childId: string
}

const node = (state: INode, action: IAction): INode => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        childIds: [],
        html: '',
        id: action.id,
        parentId: ''
      }
    case ADD_CHILD:
      return {
        ...state,
        childIds: state.childIds.concat(action.childId)
      }
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
    tree: {
      ...state.tree,
      [id]: node(state.tree[id], action)
    }
  }
}
