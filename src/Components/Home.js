import React from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

const Home = ({ history }) => {
    return (
        <div className='d-flex justify-content-between flex-wrap'>
            <h4>Dashboard</h4>
            <div>
                <Button variant='contained' onClick={() => history.push('/reservation-list')}>
                    Reservation List
                </Button>
                <Button className='ml-2' variant='contained' onClick={() => history.push('/create-reservation')}>
                    New Reservation
                </Button>
            </div>
        </div>
    )
}

export default withRouter(Home)
