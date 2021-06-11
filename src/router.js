import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
// import SetAccount from './pages/setAccount'
// import ManageBar from './pages/manageBar'
// import Login from './pages/login'
// import Register from './pages/register'
// import PublicLayout from './component/layout'

const proRouter = () => {
    return (
        <Router>
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/setSubAccount' component={SetAccount} />
            <Route exact path='/manageBar' component={ManageBar} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} /> */}
        </Router>
    )
}

export default proRouter