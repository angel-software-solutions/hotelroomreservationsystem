import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { getStorage } from '../util/storage'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import LogOut from './LogOut'

const Restricted = (props) => {
    useEffect(() => {
        if (!getStorage('token')) props.history.push('/login')
    }, [props.location.pathname, props.history])

    return (
        <>
            <Header />
            <div className='app-content content'>
                <div className='content-overlay'></div>
                <div className='header-navbar-shadow'></div>
                <div className='content-wrapper'>
                    <div className='content-header row'></div>
                    <Switch>
                        <Route path='/logout' component={LogOut} exact />
                        <Route path='/' component={Home} exact />
                    </Switch>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(Restricted)
