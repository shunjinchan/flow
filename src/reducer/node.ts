import { CREATE_NODE } from '../actions/node'

interface IAction {
  type: string
  nodeId: string
  parent: string
}

const node = (state: any, action: IAction) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        children: [],
        id: action.nodeId,
        parent: action.parent
      }
    default:
      return state
  }
}

export default (state = {}, action: IAction) => {
  const { nodeId } = action

  if (typeof nodeId === 'undefined') {
    return state
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}
