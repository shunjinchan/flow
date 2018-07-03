import * as React from 'react'
import Node from '../Node/Node'
import './Board.css'

class Board extends React.Component {
  public render() {
    return (
      <main className="board">
        <article className="article">
          <Node />
        </article>
      </main>
    )
  }
}

export default Board
