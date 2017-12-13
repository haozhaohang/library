import { combineReducers, createStore  } from 'redux'

import rootReducers from '../reducers'

const store = createStore(
    combineReducers(rootReducers)
)

export default store