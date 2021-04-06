import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Users from '../Data/User'
import { connect } from 'react-redux'
import { callApi } from '../util/api'
import { getStorage, setStorage } from '../util/storage'
import Footer from './Footer'
import Header from './Header'
import { setToken, setUserInfo } from '../action'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})

    const onLogin = useCallback(async () => {
        if (!email.trim() || !password.trim()) {
            let err = {}
            if (!email.trim()) err.email = 'Username number reuired.'
            if (!password.trim()) err.password = 'Password is required.'
            if (err.email || err.password) {
                setError(err)
                return
            }
        }
        let res = await Users.getUser(email)
        if (!res) {
            setError({ email: 'User not exist.', password: undefined })
            return
        } else if (res && res.password !== password) {
            setError({ password: 'Password is incorrect.', email: undefined })
            return
        }
        setError({})
        setStorage('token', true)
        setStorage('user', res)
        props.setToken(true)
        props.setUserInfo(res)
        props.history.push('/')
        // window.location.assign('/')
    }, [email, password])

    useEffect(() => {
        if (getStorage('token')) props.history.push('/')
    }, [props.location.pathname, props.history])

    return (
        <>
            <Header />
            <main className='d-flex align-items-center min-vh-100 py-3 py-md-0 login-bg-mobile'>
                <div className='container'>
                    <div className='col-md-6 offset-md-3 justify-content-center'>
                        <div className='card login-card'>
                            <div className='card-body'>
                                <h2 className='login-card-title'>Login</h2>
                                <form>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputIcon3'>Username</label>
                                        <div className='input-group'>
                                            <div className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                    <span className='fa fa-user'></span>
                                                </span>
                                            </div>
                                            <input
                                                className='form-control form-control-lg'
                                                type='text'
                                                placeholder='Username'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <span style={{ color: 'red' }}>{error.email}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputIcon3'>Password</label>
                                        <div className='input-group'>
                                            <div className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                    <span className='fa fa-lock'></span>
                                                </span>
                                            </div>
                                            <input
                                                className='form-control form-control-lg'
                                                placeholder='Password'
                                                type='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <span style={{ color: 'red' }}>{error.password}</span>
                                    </div>
                                    <p className='btn btn-primary mb-2 waves-input-wrapper waves-effect waves-light' onClick={onLogin}>
                                        Login
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default connect(null, { setToken, setUserInfo })(withRouter(Login))
