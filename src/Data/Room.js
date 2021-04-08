const Room = {
    rooms: [
        { id: 100, cost: 300, bed: 1 },
        { id: 101, cost: 500, bed: 2 },
        { id: 102, cost: 300, bed: 1 },
        { id: 103, cost: 500, bed: 2 },
        { id: 104, cost: 300, bed: 1 },
        { id: 105, cost: 500, bed: 2 },
        { id: 106, cost: 300, bed: 1 },
        { id: 107, cost: 500, bed: 2 },
        { id: 108, cost: 300, bed: 1 },
        { id: 109, cost: 500, bed: 2 }
    ],

    getAll() {
        var self = this
        return new Promise((resolve, reject) => {
            resolve(self.rooms)
        })
    },

    get(id) {
        var self = this
        return new Promise(async (resolve) => {
            id = Number(id)
            if (self.rooms) {
                resolve(self.find(id), null)
            }
        })
    },

    find(id) {
        var self = this
        var room = self.rooms.find(function (w) {
            return w.id === id
        })
        return room
    }
}

export default Room
