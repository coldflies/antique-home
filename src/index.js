import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './model'
import { Provider } from 'react-redux'
import App from './router'
// import '@/assets/css/main.css'

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

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
