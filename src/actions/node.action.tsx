export const CREATE_NODE = 'CREATE_NODE'
export const ADD_CHILD = 'ADD_CHILD'

export const createNode = (nodeId: string) => ({
  id: nodeId,
  type: CREATE_NODE
})

export const addChild = (nodeId: string, childId: string) => ({
  childId,
  id: nodeId,
  type: ADD_CHILD
})
