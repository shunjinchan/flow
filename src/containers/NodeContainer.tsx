import { connect } from 'react-redux'
import * as shortid from 'shortid'
import { addChild, removeChild, updateText } from '../actions/node.action'
import { createNode, destoryNode } from '../actions/tree.action';
import Node from '../components/Node/Node'
import * as nodeService from '../services/node.service'
import * as treeService from '../services/tree.service'
import { INode } from '../types/node.type'
import { IStoreState } from '../types/store.type'

const mapStateToProps = (
  state: IStoreState,
  ownProps: { id: string }
): INode => {
  return {
    ...state.tree[ownProps.id]
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addChild: (id: string, childId: string) => {
      dispatch(addChild(id, childId))
      nodeService.addChild(id, childId)
    },
    createNode: (parentId: string, id: string = shortid.generate()) => {
      const node = createNode(id, parentId)
      dispatch(node)
      treeService.createNode({
        childIds: [],
        id: node.id,
        parentId: node.parentId,
        text: ''
      })
      return id
    },
    destoryNode: (id: string) => {
      dispatch(destoryNode(id))
    },
    removeChild: (id: string, childId: string) => {
      dispatch(removeChild(id, childId))
    },
    updateText: (id: string, text: string) => {
      dispatch(updateText(id, text))
      nodeService.updateText(id, text)
    }
  }
}

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)

export default NodeContainer
