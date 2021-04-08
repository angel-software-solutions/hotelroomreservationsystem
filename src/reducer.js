const initialState = { userInfo: {} }

// eslint-disable-next-line import/no-anonymous-default-export
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
