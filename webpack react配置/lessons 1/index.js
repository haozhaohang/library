import React from 'react'
import ReactDom from 'react-dom'

const render = () => {
    ReactDom.render(
        <h1>
            webpack React 配置
        </h1>,
        document.getElementById('app-containers')
    )
}

render()