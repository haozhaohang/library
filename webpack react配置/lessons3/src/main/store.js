import { combineReducers, createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from '../reduces'

const middleware = [thunk]

const store = createStore(
    combineReducers(rootReducers),
    {},
    applyMiddleware(...middleware)
)

export default store