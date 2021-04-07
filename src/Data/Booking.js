import moment from 'moment'
import Room from './Room'
import User from './User'

const Bookings = {
    bookings: [],

    getAll() {
        var self = this
        return new Promise(async (resolve, reject) => {
            let list = await self.processAll(self.bookings)
            resolve(list)
        })
    },

    processAll(list) {
        return new Promise((resolve, reject) => {
            let newlist = []
            list.forEach((val) => {
                val.roomDetail = Room.find(val.room)
                newlist.push(val)
            })
            resolve(newlist)
        })
    },

    get(id) {
        var self = this
        return new Promise(async (resolve) => {
            id = Number(id)
            if (self.bookings) {
                let val = self.find(id)
                if (val) {
                    val.roomDetail = Room.find(val.room)
                    val.userDetail = User.find(val.createdBy)
                }
                resolve(val)
            }
        })
    },

    save(booking) {
        var self = this
        var id = booking.id ? Number(booking.id) : 0
        var saved = false
        return new Promise(async (resolve) => {
            if (id !== 0) {
                saved = await self.saveEdited(booking)
                await self.postOnServer()
            } else {
                saved = await self.saveCreated(booking)
                await self.postOnServer()
            }
            resolve(saved)
        })
    },

    postOnServer() {
        return new Promise(async (resolve) => {
            resolve(true)
        })
    },

    saveEdited(booking) {
        var self = this
        var id = Number(booking.id)
        return new Promise(async (resolve) => {
            if (!self.bookings) {
                await self.getAll()
            }
            var current_list = self.find(id)
            current_list.updatedAt = moment().startOf('day').toISOString()
            current_list.room = booking.room
            current_list.notes = booking.notes
            current_list.date = booking.date
            current_list.todate = booking.todate
            current_list.client = booking.client
            resolve(true)
        })
    },

    saveCreated(booking) {
        var self = this
        var id = self.getNextId()
        booking.id = id
        return new Promise(async (resolve) => {
            if (!self.bookings) {
                await self.getAll()
            }
            self.bookings.push({ ...booking, createdAt: moment().startOf('day').toISOString(), updatedAt: moment().startOf('day').toISOString() })
            resolve(true)
        })
    },

    find(id) {
        var self = this
        var booking = self.bookings.find(function (w) {
            return w.id === id
        })
        return booking
    },

    getNextId() {
        var self = this
        var id = 0
        self.bookings.forEach((booking) => {
            if (booking.id > id) {
                id = booking.id
            }
        })
        id++
        return id
    },

    saveEditedList(list) {
        var self = this
        self.bookings = list
        return new Promise(async (resolve) => {
            await self.postOnServer()
            resolve(true)
        })
    },

    deletebooking(id) {
        var self = this
        return new Promise(async (resolve, reject) => {
            let list = await self.getAll()
            list = list.filter((el) => el.id !== id)
            await self.saveEditedList(list)
            resolve(true)
        })
    }
}

export default Bookings
