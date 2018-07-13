import { ADD_CHILD, REMOVE_CHILD, UPDATE_TEXT } from '../actions/node.action'
import { CREATE_NODE, DESTORT_NODE } from '../actions/tree.action'
import { INode } from '../types/node.type'
import { ITree } from '../types/tree.type'
import nodeReducer from './node.reducer'

export interface IAction {
  type: string
  id: string
  childId: string
  parentId: string
  text: string
}

const initialState: ITree = {
  root: { text: 'Home', id: 'root', childIds: [], parentId: '' }
}

const treeReducer = (state: ITree, action: IAction): ITree => {
  const destoryNode = (treeState: ITree, id: string): ITree => {
    delete treeState[id]
    return {
      ...treeState
    }
  }

  const createNode = (
    treeState: ITree,
    id: string,
    parentId: string
  ): ITree => {
    const newNode: INode = {
      childIds: [],
      id,
      parentId,
      text: ''
    }
    return Object.assign({}, treeState, {
      [newNode.id]: newNode
    })
  }

  switch (action.type) {
    case DESTORT_NODE:
      return destoryNode(state, action.id)
    case CREATE_NODE:
      return createNode(state, action.id, action.parentId)
    default:
      return state
  }
}

const isTreeActionType = (type: string) => {
  return type === DESTORT_NODE || type === CREATE_NODE
}

const isNodeActionType = (type: string) => {
  return type === ADD_CHILD || type === REMOVE_CHILD || type === UPDATE_TEXT
}

export default function tree(state = initialState, action: IAction): ITree {
  const { type, id } = action

  if (isTreeActionType(type)) {
    return treeReducer(state, action)
  }
  if (isNodeActionType(type)) {
    return {
      ...state,
      [id]: nodeReducer(state[id], action)
    }
  }

  return state
}
