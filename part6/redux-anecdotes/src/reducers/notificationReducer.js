import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    'name':'notification', 
    initialState : '', 
    reducers : {
        setNotification(state, action){
            return action.payload
        },
        hideNotification(state,action){
            return ''
        }
    }
})

export const createNotification = (content, timeout) => {
    return async dispatch => {
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(() => {
        dispatch(hideNotification())
    }, 1000 * timeout)
}
}

export const {setNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer