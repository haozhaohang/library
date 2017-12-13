import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app.js'

import './index.css'
 
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app-container'),
  )
}
 
render(App)
 
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app.js', () => { render(App) })
}