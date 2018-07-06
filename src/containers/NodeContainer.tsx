import { connect } from 'react-redux'
import * as shortid from 'shortid'
import { addChild, createNode, updateText } from '../actions/node.action'
import Node from '../components/Node/Node'
import * as nodeService from '../services/node.service'
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
    createNode: (id: string = shortid.generate(), parentId: string) => {
      const node = createNode(id, parentId)
      dispatch(node)
      nodeService.createNode({
        childIds: [],
        id: node.id,
        parentId: node.parentId,
        text: ''
      })
      return id
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
