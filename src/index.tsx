import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App/App'
import './index.css'
import nodeReducer from './reducers/node.reducer'
import registerServiceWorker from './registerServiceWorker'
import { getTree } from './services/tree.service'

const tree = getTree()
const store = createStore(
  nodeReducer,
  {
    tree
  },
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
