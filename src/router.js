import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import PublicLayout from '@/src/component/layout'
import Unmovable from './pages/unmovable'
import Movable from './pages/movable'
import Area from './pages/area'
import NewsList from './pages/newsList'

const proRouter = () => {
    return (
        <>
            <Route exact path='/' component={Home} />
            <Route exact path='/unmovable' component={Unmovable} />
            <Route exact path='/movable' component={Movable} />
            <Route exact path='/area' component={Area} />
            <Route exact path='/newsList' component={NewsList} />
        </>
    )
}

export default PublicLayout(proRouter)