import { connect } from 'react-redux'
import Node from '../components/Node/Node'

const mapStateToProps = (
  state: any,
  ownProps: {
    id: string
  }
): { id: string; html: string; parent: string; children: string[] } => {
  return {
    ...state[ownProps.id]
  }
}

const NodeContainer = connect(mapStateToProps)(Node)

export default NodeContainer
