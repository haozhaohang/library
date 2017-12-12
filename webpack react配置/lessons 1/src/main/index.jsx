import React from 'react'
import ReactDOM from 'react-dom'

const render = () => {
    ReactDOM.render(
        <h1>Hello React</h1>,
        document.getElementById('app-container')
    )
}

render()