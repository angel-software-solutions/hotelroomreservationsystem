export const setUserInfo = (props) => {
    return (dispatch) => {
        dispatch({ type: 'SET_USERINFO', payload: props })
    }
}

export const setToken = (props) => {
    return (dispatch) => {
        dispatch({ type: 'SET_TOKEN', payload: props })
    }
}
