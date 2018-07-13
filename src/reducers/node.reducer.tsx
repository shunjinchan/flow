import {
  ADD_CHILD,
  REMOVE_CHILD,
  UPDATE_PARENT_ID,
  UPDATE_TEXT
} from '../actions/node.action'
import { INode } from '../types/node.type'
import { IAction } from './tree.reducer';

const node = (state: INode, action: IAction): INode => {
  switch (action.type) {
    case ADD_CHILD:
      return {
        ...state,
        childIds: [...state.childIds, action.childId]
      }
    case REMOVE_CHILD:
      const index = state.childIds.indexOf(action.childId)
      state.childIds.splice(index, 1)
      return {
        ...state,
        childIds: [...state.childIds]
      }
    case UPDATE_TEXT:
      return {
        ...state,
        text: action.text
      }
    case UPDATE_PARENT_ID:
      return {
        ...state,
        parentId: action.parentId
      }
    default:
      return state
  }
}

export default node
