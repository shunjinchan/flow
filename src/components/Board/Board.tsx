import * as React from 'react'
import { getRootNode } from '../../services/node'
import Node from '../Node/Node'
import './Board.css'

class Board extends React.Component {
  public render() {
    const root = getRootNode()
    return (
      <main className="board">
        <article className="article">
          <Node id={root.id} html={root.html} />
        </article>
      </main>
    )
  }
}

export default Board
