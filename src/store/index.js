import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import layoutReducer from './reducers/layoutReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  userReducer,
  layoutReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store