export function setStorage(name, item) {
    localStorage.setItem(name, item ? window.btoa(JSON.stringify(item)) : null)
}

export function getStorage(name) {
    let item = localStorage.getItem(name) ? JSON.parse(window.atob(localStorage.getItem(name))) : null
    return item
}

export function capitalize(line) {
    return line ? line.charAt(0).toUpperCase() + line.slice(1).toLowerCase() : ''
}
