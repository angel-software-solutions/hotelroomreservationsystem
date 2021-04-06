const initialState = { userInfo: {} }

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERINFO': {
            return { ...state, userInfo: action.payload }
        }
        case 'SET_TOKEN': {
            return { ...state, token: action.payload }
        }
        default:
            return state
    }
}
