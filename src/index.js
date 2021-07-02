import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './model'
import { Provider } from 'react-redux'
import ProjectRouter from './router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '@/assets/css/main.css'

const sagaMiddleware = createSagaMiddleware() // 创建中间件
const store = createStore(
    (state = {}, action) => {
        if (action.type == 'success') {
            return { ...state, ...action.payload }
        }
    },
    applyMiddleware(sagaMiddleware) // 将中间件放入applyMiddleware
)
sagaMiddleware.run(rootSaga)

const App = props => {
    return (
        <Router>
            <Switch>
                {/* <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} /> */}
                <Route path='/' component={ProjectRouter} />
            </Switch>
        </Router>
    )
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
