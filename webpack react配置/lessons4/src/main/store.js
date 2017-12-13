import { combineReducers, createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from '../reducers'

const middleware = [thunk]

const store = createStore(
    combineReducers(rootReducers),
    {},
    applyMiddleware(...middleware)
)

export default store