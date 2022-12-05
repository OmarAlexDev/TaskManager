import {createSlice} from '@reduxjs/toolkit'

const initialState = "LIGHT"

const modeSlice= createSlice({
    name: 'darkmode',
    initialState,
    reducers:{
        initializeDarkMode(state,action){
            return action.payload
        }
    }
})

export const modeReducer = modeSlice.reducer
export const {initializeDarkMode} = modeSlice.actions