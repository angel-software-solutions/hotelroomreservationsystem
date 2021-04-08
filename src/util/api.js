import { getStorage } from '../util/storage'

export function callApi(object) {
    const header_token = getStorage('token')
    let headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (header_token)
        headers.headers.Authorization =
            'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjQyLjEwOTo4MDgxXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjE1NzA5NDEwLCJleHAiOjE2MTU3MTMwMTAsIm5iZiI6MTYxNTcwOTQxMCwianRpIjoiSmtudnRUOU9xWnFwNWdDWiIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.6tSctJOsvnGqF12HU4UWT_fkpZ4gzRm3nFu6m3HsBUY' // header_token
    // return new Promise((resolve, reject) => {
    //     axios[object.method || 'post']('localhost' + object.url, object.request, headers)
    //         .then(({ data }) => {
    //             resolve(data)
    //         })
    //         .catch((error) => {
    //             reject(error.response && error.response.data ? error.response : error)
    //         })
    // })
}
