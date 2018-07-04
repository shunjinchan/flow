import { connect } from 'react-redux'
import * as shortid from 'shortid'
import { addChild, createNode } from '../actions/node.action'
import Node from '../components/Node/Node'

const mapStateToProps = (
  state: any,
  ownProps: { id: string }
): { id: string; html: string; parentId: string; childIds: string[] } => {
  return {
    ...state.tree[ownProps.id]
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addChild: (id: string, childId: string) => {
      dispatch(addChild(id, childId))
    },
    createNode: () => {
      const id = shortid.generate()
      dispatch(createNode(id))
      return id
    }
  }
}

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)

export default NodeContainer
