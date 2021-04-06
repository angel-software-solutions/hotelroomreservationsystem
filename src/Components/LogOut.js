import React, { useEffect } from 'react'

const LogOut = () => {
    useEffect(() => {
        localStorage.clear()
        window.location.assign('/')
    }, [])

    return <></>
}

export default LogOut
