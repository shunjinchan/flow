import {
  ADD_CHILD,
  REMOVE_CHILD,
  UPDATE_TEXT
} from '../actions/node.action'
import { INode } from '../types/node.type'

interface IAction {
  type: string
  id: string
  childId: string
  text: string
  parentId: string
}

const nodeReducer = (state: INode, action: IAction): INode => {
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
    default:
      return state
  }
}

export { nodeReducer }
