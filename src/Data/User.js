const Users = {
    users: [
        {
            name: 'Optym01',
            password: 'Optym01',
            id: 1
        },
        {
            name: 'Optym02',
            password: 'Optym02',
            id: 2
        }
    ],

    getAll() {
        var self = this
        return new Promise((resolve, reject) => {
            resolve(self.users)
        })
    },

    get(id) {
        var self = this
        return new Promise(async (resolve) => {
            id = Number(id)
            if (self.users) {
                resolve(self.find(id), null)
            }
        })
    },

    getUser(name) {
        var self = this
        return new Promise(async (resolve) => {
            let found = self.users.find((el) => el.name === name)
            if (found) resolve(found)
            else resolve(false)
        })
    },

    save(user) {
        var self = this
        var id = Number(user.id)
        var saved = false
        return new Promise(async (resolve) => {
            if (id !== 0) {
                saved = await self.saveEdited(user)
                await self.postOnServer()
            } else {
                saved = await self.saveCreated(user)
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

    saveEdited(user) {
        var self = this
        var id = Number(user.id)
        return new Promise(async (resolve) => {
            if (!self.users) {
                await self.getAll()
            }
            var current_list = self.find(id)
            current_list.name = user.name
            current_list.password = user.password
            resolve(true)
        })
    },

    saveCreated(user) {
        var self = this
        var id = self.getNextId()
        user.id = id
        return new Promise(async (resolve) => {
            if (!self.users) {
                await self.getAll()
            }
            self.users.push(user)
            resolve(true)
        })
    },

    find(id) {
        var self = this
        var user = self.users.find(function (w) {
            return w.id === id
        })
        return user
    },

    getNextId() {
        var self = this
        var id = 0
        self.users.forEach((user) => {
            if (user.id > id) {
                id = user.id
            }
        })
        id++
        return id
    },

    saveEditedList(list) {
        var self = this
        self.users = list
        return new Promise(async (resolve) => {
            await self.postOnServer()
            resolve(true)
        })
    },

    deleteuser(id) {
        var self = this
        return new Promise(async (resolve, reject) => {
            let list = await self.getAll()
            list = list.filter((el) => el.id !== id)
            await self.saveEditedList(list)
            resolve(true)
        })
    }
}

export default Users
