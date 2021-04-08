import React from 'react'

const Footer = () => {
    return (
        <footer className='main-footer d-flex p-2 px-3 bg-primary border-top fixed-bottom text-white'>
            <span className='copyright ml-auto my-auto mr-2'>
                COPYRIGHT -{' '}
                <a target='_blank' rel='noreferrer' className='text-white' href='/'>
                    Optym
                </a>{' '}
                2021
            </span>
        </footer>
    )
}

export default Footer
