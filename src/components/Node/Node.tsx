import * as React from 'react'
import NodeContainer from '../../containers/NodeContainer'
import './Node.css'
import { NodeText } from './NodeText'

interface INodeProps {
  id: string
  html: string
  children: string[]
  parent: string
}

function NodeChildren(props: { children: string[] }) {
  if (props.children.length > 0) {
    const children: any = props.children.map((nodeId, index) => (
      <NodeContainer id={nodeId} />
    ))
    return <div className="node-childen">{children}</div>
  }
  return null
}

class Node extends React.Component<INodeProps> {
  public render() {
    return (
      <section className="node">
        <NodeText {...this.props} />
        <NodeChildren {...this.props} />
      </section>
    )
  }
}

export default Node
