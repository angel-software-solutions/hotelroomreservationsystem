import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { getStorage } from '../util/storage'

const Header = ({ reducer, location }) => {
    let isAuthenticated = getStorage('token')
    const history = useHistory()

    function handleLogout() {
        localStorage.clear()
        history.push('/login')
    }

    useEffect(() => {
        if (!getStorage('token')) handleLogout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <Navbar bg='primary' variant='dark' fixed='top' expand='lg'>
            <Link to={isAuthenticated ? '/' : '/login'}>
                <Navbar.Brand className='ml-2'>Optym</Navbar.Brand>
            </Link>
            {isAuthenticated && (
                <>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'></Nav>
                        <Nav inline className='mr-2'>
                            <Link className='nav-link'>{reducer.userInfo.name}</Link>
                            <Link onClick={handleLogout} className='nav-link'>
                                Logout
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </>
            )}
        </Navbar>
    )
}

export default connect((props) => {
    return props
}, null)(withRouter(Header))
