import { ADD_CHILD, REMOVE_CHILD, UPDATE_TEXT } from '../actions/node.action'
import { CREATE_NODE, DESTORT_NODE } from '../actions/tree.action'
import { IStoreState } from '../types/store.type'
import { nodeReducer } from './node.reducer'
import { treeReducer } from './tree.reducer'

interface IAction {
  type: string
  id: string
  childId: string
  text: string
  parentId: string
}

export default (state: IStoreState, action: IAction): IStoreState => {
  const { id } = action

  if (typeof id === 'undefined') {
    return state
  }

  if (
    action.type === ADD_CHILD ||
    action.type === REMOVE_CHILD ||
    action.type === UPDATE_TEXT
  ) {
    return {
      ...state,
      tree: {
        ...state.tree,
        [id]: nodeReducer(state.tree[id], action)
      }
    }
  }

  if (action.type === DESTORT_NODE || action.type === CREATE_NODE) {
    return {
      ...state,
      tree: treeReducer(state.tree, action)
    }
  }

  return state
}
