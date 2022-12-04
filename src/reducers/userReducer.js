import {createSlice} from '@reduxjs/toolkit'

const initialState = null

const userSplice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setLoggedUser(state,action){
            return action.payload
        }
    }
})

export const userReducer = userSplice.reducer
export const {setLoggedUser} = userSplice.actions