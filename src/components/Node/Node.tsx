import * as React from 'react'
import './Node.css'
import { NodeText } from './NodeText'

interface INodeProps {
  id: string
  html: string
}

class Node extends React.Component<INodeProps> {
  public render() {
    return (
      <section className="node">
        <NodeText id={this.props.id} html={this.props.html} />
      </section>
    )
  }
}

export default Node
