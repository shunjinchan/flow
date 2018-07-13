/**
 * 节点数据结构
 */
export interface INode {
  id: string
  text: string
  parentId: string
  childIds: string[]
}
