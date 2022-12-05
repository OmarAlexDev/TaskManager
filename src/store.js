import {configureStore} from '@reduxjs/toolkit'
import { taskReducer } from './reducers/taskReducer'
import { userReducer } from './reducers/userReducer'
import { modeReducer } from './reducers/modeReducer'

const store = configureStore({
    reducer:{
        tasks: taskReducer,
        user: userReducer,
        darkmode: modeReducer
    }
})

export default store