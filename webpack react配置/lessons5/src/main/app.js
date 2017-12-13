import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import Home from '../containers/Home'
import About from '../containers/About'
import Topics from '../containers/Topics'
import store from './store'

// BrowserRouter 下只能有一个子元素
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/topics">Topics</Link></li>
                        </ul>

                        <hr/>

                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App