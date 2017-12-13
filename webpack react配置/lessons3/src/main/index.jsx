import React from 'react'
import ReactDOM from 'react-dom'

import App from './app.js'

const render = Component => {
    ReactDOM.render(
        <Component />,
        document.getElementById('app-container')
    )
}

render(App)