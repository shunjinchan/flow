import * as React from 'react'
import NodeContainer from '../../containers/NodeContainer'
import './App.css'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <main className="board">
          <article className="tree">
            <NodeContainer id="root" />
          </article>
        </main>
      </div>
    )
  }
}

export default App
