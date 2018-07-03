import * as React from 'react'
import './Node.css'
import { NodeText } from './NodeText'

class Node extends React.Component {
  public render() {
    return (
      <section className="node">
        <NodeText />
      </section>
    )
  }
}

export default Node
