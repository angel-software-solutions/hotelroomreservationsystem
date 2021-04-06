import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { setUserInfo } from '../action'
import { getStorage } from '../util/storage'

const Header = ({ reducer, setUserInfo }) => {
    let isAuthenticated = getStorage('token')
    const history = useHistory()
    const [open, setOpen] = useState(null)

    const getInfo = async () => {
        let info = {}
        setUserInfo(info)
    }

    useEffect(() => {
        if (isAuthenticated) {
            getInfo()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    async function handleLogout() {
        history.push('/logout')
    }

    function handleClose() {
        setOpen(null)
    }

    return (
        <Navbar bg='primary' variant='dark' fixed='top' expand='lg'>
            <Link to='/'>
                <Navbar.Brand className='ml-2'>Optym</Navbar.Brand>
            </Link>
            {isAuthenticated && (
                <>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Link to='/' className='nav-link text-deco'>
                                Reservations
                            </Link>
                        </Nav>
                        <Nav inline className='mr-2'>
                            <Link onClick={(e) => setOpen(e.currentTarget)} className='nav-link'>
                                {reducer.userInfo.name}
                                {/* {!open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />} */}
                            </Link>
                            <Link onClick={handleLogout} className='nav-link'>
                                Logout
                            </Link>
                            {/* <Menu
                                className='profile-menu'
                                anchorEl={open}
                                id='customized-menu'
                                open={Boolean(open)}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                getContentAnchorEl={null}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                                disableScrollLock={true}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleLogout()
                                        handleClose()
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu> */}
                        </Nav>
                    </Navbar.Collapse>
                </>
            )}
        </Navbar>
    )
}

export default connect(
    (props) => {
        return props
    },
    { setUserInfo }
)(withRouter(Header))
