import * as React from 'react'
import NodeContainer from '../../containers/NodeContainer'
import './Node.css'
import { NodeText } from './NodeText'

interface INodeProps {
  id: string
  html: string
  childIds: string[]
  parentId: string
  createNode: () => string
  addChild: (id: string, childId: string) => void
}

function NodeChildren(props: { childIds: string[] }) {
  if (props.childIds.length > 0) {
    const children: JSX.Element[] = props.childIds.map((nodeId, index) => (
      <NodeContainer id={nodeId} />
    ))
    return <div className="node-childen">{children}</div>
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
