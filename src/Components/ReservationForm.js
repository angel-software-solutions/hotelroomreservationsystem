import React, { useCallback, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import { Select, DatePicker } from 'antd'
import { capitalize, getStorage } from '../util/storage'
import Room from '../Data/Room'
import moment from 'moment'
import Bookings from '../Data/Booking'

function MultiFields(field) {
    let wide = isMobile() ? 100 : field.length === 1 ? 100 : 100 / field.length - 5
    return (
        <div className='d-flex justify-content-between flex-wrap width-full mb-15'>
            {field.map((f) => {
                return (
                    <div style={{ width: wide + '%' }}>
                        <div className='d-flex flex-column width-full'>
                            <div className='width-full'>{f.label}</div>
                            <div className='width-full'>{f.component}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function SelectBox({ error, options, value, onChange, ...props }) {
    return (
        <>
            <Select onChange={onChange} value={value} {...props}>
                {options.map((item) => {
                    return (
                        <Select.Option key={item.key || item} value={item.key || item}>
                            {item.value || item}
                        </Select.Option>
                    )
                })}
            </Select>
            <span style={{ color: 'red' }}>{error}</span>
        </>
    )
}

function InputBox({ error, value, onChange, ...props }) {
    return (
        <>
            <input onChange={onChange} value={value} {...props} />
            <span style={{ color: 'red' }}>{error}</span>
        </>
    )
}

function TextArea({ error, value, onChange, ...props }) {
    return (
        <>
            <textarea onChange={onChange} value={value} {...props} />
            <span style={{ color: 'red' }}>{error}</span>
        </>
    )
}

function isMobile() {
    return window.innerWidth <= 767 ? true : false
}

const ReservationForm = ({ history, location }) => {
    const user = getStorage('user')
    const [item, setItem] = useState({ client: {}, name: user.name })
    const [error, setError] = useState({ client: {} })
    const [room, setRoom] = useState([])
    const [booking, setBooking] = useState([])
    const [roomList, setRoomList] = useState([])
    const [edit, setEdit] = useState({})

    const validate = () => {
        let flag = true
        let err = { client: {} }
        let required = ['name', 'date', 'room']
        required.forEach((field) => {
            let msg = capitalize(field) + ' is required.'
            if (!item[field]) {
                flag = false
                err[field] = msg
            }
            if (typeof item[field] === 'string' && !item[field].trim().length) {
                flag = false
                err[field] = msg
            }
        })
        required = ['name', 'mobile', 'email']
        required.forEach((field) => {
            let msg = 'Client ' + capitalize(field) + ' is required.'
            if (!item.client[field]) {
                flag = false
                err.client[field] = msg
            }
            if (typeof item.client[field] === 'string' && !item.client[field].trim().length) {
                flag = false
                err.client[field] = msg
            }
        })
        // eslint-disable-next-line no-useless-escape
        var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (item.client.email && !item.client.email.match(mailformat)) {
            flag = false
            err.client.email = 'Email not valid.'
        }
        var mobileformat = /^([1-9]{1})([0-9]{9})$/
        if (item.client.mobile && !item.client.mobile.match(mobileformat)) {
            flag = false
            err.client.mobile = 'Mobile not valid.'
        }
        setError(err)
        return flag
    }

    const onSave = async () => {
        if (validate()) {
            await Bookings.save(item)
            history.push('/reservation-list')
        }
    }

    const handleChange = (val, k) => {
        setItem({ ...item, [k]: val })
    }

    const clientChange = (val, k) => {
        setItem({ ...item, client: { ...item.client, [k]: val } })
    }

    const getRooms = useCallback(async () => {
        let rooms = await Room.getAll()
        setRoom(rooms)
        setRoomList(rooms.map((x) => x.id))
    }, [])

    const getBooks = useCallback(async () => {
        let book = await Bookings.getAll()
        if (location.search) {
            let itm = book.find((el) => el.id === parseInt(location.search.split('?')[1]))
            if (itm) setEdit(itm)
        }
        setBooking(book)
    }, [location.search])

    useEffect(() => {
        getBooks()
        getRooms()
    }, [getRooms, getBooks])

    useEffect(() => {
        if (edit.room) setItem(edit)
    }, [edit.room, edit])

    useEffect(() => {
        let found = item.date && booking.filter((el) => el.date === item.date).map((el) => el.room)
        if (edit.room && found && found.includes(edit.room)) found = found.filter((el) => el !== edit.room)
        if (found && found.length) {
            setRoomList(room.filter((el) => !found.includes(el.id)).map((el) => el.id))
            if (found.includes(item.room)) handleChange(undefined, 'room')
        } else setRoomList(room.map((el) => el.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.date])

    return (
        <>
            <div className='d-flex justify-content-between flex-wrap mb-15'>
                <h4>{item.id ? 'Edit' : 'Create'} Reservation</h4>
                <div>
                    <Button variant='contained' onClick={onSave}>
                        Save
                    </Button>
                    <Button className='ml-2' variant='contained' onClick={() => history.push('/')}>
                        Cancel
                    </Button>
                </div>
            </div>
            <div className='d-flex justify-content-between flex-wrap form-create'>
                {MultiFields([
                    { label: 'Username', component: <InputBox value={item.name} disabled /> },
                    { label: 'Room No.', component: <SelectBox error={error.room} options={roomList} value={item.room} onChange={(e) => handleChange(e, 'room')} /> },
                    {
                        label: 'Reservation Date',
                        component: (
                            <>
                                <DatePicker
                                    className='width-full'
                                    value={item.date && moment(item.date) ? moment(item.date) : undefined}
                                    onChange={(e) => {
                                        let _i = e && e._d ? moment(e._d).startOf('day').toISOString() : undefined
                                        handleChange(_i, 'date')
                                    }}
                                    format='DD/MM/YYYY'
                                    disabledDate={(current) => {
                                        return current && current < moment().endOf('day')
                                    }}
                                />
                                <span style={{ color: 'red' }}>{error.date}</span>
                            </>
                        )
                    }
                ])}
                {MultiFields([
                    { label: 'Client Name', component: <InputBox value={item.client.name} error={error.client.name} onChange={(e) => clientChange(e.target.value, 'name')} /> },
                    {
                        label: 'Mobile',
                        component: <InputBox value={item.client.mobile} error={error.client.mobile} onChange={(e) => clientChange(e.target.value, 'mobile')} />
                    },
                    {
                        label: 'Email',
                        component: <InputBox value={item.client.email} error={error.client.email} onChange={(e) => clientChange(e.target.value, 'email')} />
                    }
                ])}
                {MultiFields([{ label: 'Notes', component: <TextArea value={item.notes} onChange={(e) => handleChange(e.target.value, 'notes')} /> }])}
            </div>
        </>
    )
}

export default withRouter(ReservationForm)
