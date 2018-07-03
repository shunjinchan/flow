import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App/App'
import db from './db'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

function initDatabase() {
  if (!db.has('tree').value()) {
    db.defaults({ tree: [] }).write()
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
initDatabase()
