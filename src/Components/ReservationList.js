import React, { useState, useCallback, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withRouter } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Bookings from '../Data/Booking'
import moment from 'moment'
import { getStorage } from '../util/storage'
import DeleteModal from './DeleteModal'

const formatNumber = (num) => {
    return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0
}

export const displayFormatter = (num) => {
    if (!num || isNaN(parseFloat(num))) num = 0
    return formatNumber(parseFloat(num).toFixed(2))
}

const ReservationList = ({ history }) => {
    const [booking, setBooking] = useState(null)
    const [confirm, setConfirm] = useState(0)
    const [error,setError]=useState()

    const getBooks = useCallback(async () => {
        
        let book= await Bookings.getAll()  
        if(book.error){
            setBooking([])
            setError(book.error)
            return
        }
        setBooking(book.data)
    }, [error])

    useEffect(() => {
        getBooks()
    }, [getBooks])

    const deleteItem = async (id) => {
        setConfirm(0)
        await Bookings.deletebooking(id)
        getBooks()
    }

    return !booking ? <span>Loading....</span> : !booking.length ? (
        <div className='empty-data'>{error?error:'No Data Found.'}</div>
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
                                                <DeleteForeverIcon fontSize='small' onClick={() => setConfirm(x)} />
                                            </div>
                                        )}
                                    </div>
                                    <div>{x.client.email}</div>
                                    <div>{x.client.mobile}</div>
                                </div>
                                <h6>Booking Details</h6>
                                <div className='d-flex justify-content-between'>
                                    <span>From Date:</span>
                                    <span>{moment(x.date).format('ll')}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>To Date:</span>
                                    <span>{moment(x.todate).format('ll')}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Booking Date:</span>
                                    <span>{moment(x.createdAt).format('ll')}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Modified Date:</span>
                                    <span>{moment(x.updatedAt).format('ll')}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Room:</span>
                                    <span>
                                        {x.room} ({x.roomDetail.bed} bed{x.roomDetail.bed === 1 ? '' : 's'})
                                    </span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Price:</span>
                                    <span>Rs. {displayFormatter(x.roomDetail.cost)}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Total:</span>
                                    <span>Rs. {displayFormatter(x.roomDetail.cost * (moment(x.todate).diff(moment(x.date)) / (1000 * 60 * 60 * 24) + 1))}</span>
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
            {confirm ? (
                <DeleteModal
                    visible={true}
                    handleCancel={() => setConfirm(0)}
                    handleOk={() => deleteItem(confirm.id)}
                    name={'reservation for ' + confirm.client.name + ' from ' + moment(confirm.date).format('ll') + ' to ' + moment(confirm.todate).format('ll')}
                />
            ) : null}
        </>
    )
}

export default withRouter(ReservationList)
