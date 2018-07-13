import { combineReducers } from 'redux';
import { IStoreState } from '../types/store.type'
import tree from './tree.reducer'

const rootReducer = combineReducers({
  tree
})

export default rootReducer
