import Room from './Room'
import User from './User'

const Bookings = {
    bookings: [
        {
            id: 1,
            createdAt: '',
            updatedAt: '',
            room: 100,
            createdBy: 1,
            client: {
                name: 'Yashi Sardhara',
                mobile: '2747830292',
                email: 'yashi@gmail.com'
            },
            date: '',
            notes: ''
        }
    ],

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
                val.userDetail = User.find(val.createdBy)
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
        var id = Number(booking.id)
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
            current_list.name = booking.name
            current_list.password = booking.password
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
            self.bookings.push(booking)
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
