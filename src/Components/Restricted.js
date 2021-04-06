import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { getStorage } from '../util/storage'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import ReservationList from './ReservationList'
import ReservationForm from './ReservationForm'

const Restricted = (props) => {
    useEffect(() => {
        if (!getStorage('token')) props.history.push('/login')
    }, [props.location.pathname, props.history])

    return (
        <>
            <Header />
            <div className='app-content'>
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/reservation-list' component={ReservationList} exact />
                    <Route path='/create-reservation' component={ReservationForm} exact />
                </Switch>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(Restricted)
