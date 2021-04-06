import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Restricted from './Components/Restricted'
import { getStorage } from './util/storage'
import Login from './Components/Login'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Components/header.css'

const store = configureStore()

function App() {
    // let isAuth = store.getState().token

    // let RestrictedRoutes = ({ component: Component, ...rest }) => {
    //     return <Route {...rest} render={(props) => (!isAuth ? <Component {...props} /> : <Redirect to={'/'} />)} />
    // }

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path='/login' component={Login} exact />
                    <Restricted />
                    <Redirect from='*' to='/' />
                </Switch>
            </Router>
        </Provider>
    )
}

export default App
