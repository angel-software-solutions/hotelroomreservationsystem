import React, { useState, useCallback, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withRouter } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Bookings from '../Data/Booking'
import moment from 'moment'
import { getStorage } from '../util/storage'

const formatNumber = (num) => {
    return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0
}

const displayFormatter = (num) => {
    if (!num || isNaN(parseFloat(num))) num = 0
    return formatNumber(parseFloat(num).toFixed(2))
}

const ReservationList = ({ history }) => {
    const [booking, setBooking] = useState(null)

    const getBooks = useCallback(async () => {
        let book = await Bookings.getAll()
        setBooking(book)
    }, [])

    useEffect(() => {
        getBooks()
    }, [getBooks])

    const deleteItem = async (id) => {
        await Bookings.deletebooking(id)
        getBooks()
    }

    return !booking ? null : !booking.length ? (
        <div className='empty-data'>No Data Found.</div>
    ) : (
        <>
            <div className='d-flex justify-content-between flex-wrap'>
                <h4>Reservations</h4>
            </div>
            <div className='d-flex flex-wrap'>
                {booking.map((x) => {
                    return (
                        <Card variant='outlined' className='card-main'>
                            <CardContent>
                                <div className='mb-15'>
                                    <div className='d-flex justify-content-between'>
                                        <h4>{x.client.name}</h4>
                                        {getStorage('user').name === x.name && (
                                            <div style={{ cursor: 'pointer' }}>
                                                <EditIcon fontSize='small' onClick={() => history.push('/create-reservation?' + x.id)} />
                                                <DeleteForeverIcon fontSize='small' onClick={() => deleteItem(x.id)} />
                                            </div>
                                        )}
                                    </div>
                                    <div>{x.client.email}</div>
                                    <div>{x.client.mobile}</div>
                                </div>
                                <h6>Booking Details</h6>
                                <div className='d-flex justify-content-between'>
                                    <span>Date:</span>
                                    <span>{moment(x.date).format('ll')}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Booking Date:</span>
                                    <span>{moment(x.createdAt).format('ll')}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Room:</span>
                                    <span>
                                        {x.room} ({x.roomDetail.bed} bed{x.roomDetail.bed === 1 ? '' : 's'})
                                    </span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Price:</span>
                                    <span>Rs.{displayFormatter(x.roomDetail.cost)}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Booked By:</span>
                                    <span>{x.name}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default withRouter(ReservationList)
