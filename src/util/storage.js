export function getStorage(name) {
    let item = localStorage.getItem(name)
    return item && JSON.parse(item) ? JSON.parse(item) : null
}

export function setStorage(name, content) {
    localStorage.setItem(name, JSON.stringify(content))
}
