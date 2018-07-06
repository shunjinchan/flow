export const CREATE_NODE = 'CREATE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const UPDATE_TEXT = 'UPDATE_TEXT'
export const REMOVE_CHILD = 'REMOVE_CHILD'

export const createNode = (nodeId: string, parentId: string) => ({
  childIds: [],
  id: nodeId,
  parentId,
  text: '',
  type: CREATE_NODE
})

export const addChild = (nodeId: string, childId: string) => ({
  childId,
  id: nodeId,
  type: ADD_CHILD
})

export const removeChild = (nodeId: string, childId: string) => ({
  childId,
  id: nodeId,
  type: REMOVE_CHILD
})

export const updateText = (nodeId: string, text: string) => ({
  id: nodeId,
  text,
  type: UPDATE_TEXT
})
