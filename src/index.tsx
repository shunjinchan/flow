import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App/App'
import './index.css'
import nodeReducer from './reducer/node'
import registerServiceWorker from './registerServiceWorker'
import { getTree } from './services/node'

const tree = getTree()
const store = createStore(nodeReducer, tree)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
