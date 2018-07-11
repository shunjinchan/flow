export const CREATE_NODE = 'CREATE_NODE'
export const DESTORT_NODE = 'DESTORT_NODE'

export const createNode = (nodeId: string, parentId: string) => ({
  childIds: [],
  id: nodeId,
  parentId,
  text: '',
  type: CREATE_NODE
})

export const destoryNode = (nodeId: string) => ({
  id: nodeId,
  type: DESTORT_NODE
})
