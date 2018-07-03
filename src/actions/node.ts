import * as shortid from 'shortid'

export const CREATE_NODE = 'CREATE_NODE'

export const createNode = (nodeId = shortid.generate()) => ({
  nodeId,
  type: CREATE_NODE
})
