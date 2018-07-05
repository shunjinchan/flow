import { ADD_CHILD, CREATE_NODE, UPDATE_TEXT } from '../actions/node.action'
import { IStoreState } from '../types/store'

interface INode {
  id: string
  text: string
  parentId: string
  childIds: string[]
}

interface IAction {
  type: string
  id: string
  childId: string
  text: string
}

const node = (state: INode, action: IAction): INode => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        childIds: [],
        id: action.id,
        parentId: '',
        text: ''
      }
    case ADD_CHILD:
      return {
        ...state,
        childIds: state.childIds.concat(action.childId)
      }
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.text
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
