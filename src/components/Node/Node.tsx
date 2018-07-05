import * as React from 'react'
import NodeContainer from '../../containers/NodeContainer'
import './Node.css'
import NodeText from './NodeText'

interface INodeProps {
  id: string
  text: string
  childIds: string[]
  parentId: string
  createNode: () => string
  addChild: (id: string, childId: string) => void
  updateText: (id: string, text: string) => void
}

function NodeChildren(props: { childIds: string[] }) {
  if (props.childIds && props.childIds.length > 0) {
    const children: JSX.Element[] = props.childIds.map((nodeId, index) => (
      <NodeContainer id={nodeId} key={index} />
    ))
    return <div className="node-children">{children}</div>
  }
  return null
}

class Node extends React.Component<INodeProps> {
  public render(): JSX.Element {
    return (
      <section className="node">
        <NodeText {...this.props} />
        <NodeChildren {...this.props} /> 
      </section>
    )
  }
}

export default Node
