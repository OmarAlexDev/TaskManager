import {createSlice} from '@reduxjs/toolkit'
import taskService from '../services/taskService'

const initialState = []

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        setTasks(state,action){
            return action.payload
        },
        addTaskToState(state,action){
            return state.concat(action.payload)
        },
        removeTaskFromState(state,action){
            return state.filter(t=>t.id!==action.payload)
        },
        updateTaskFromState(state,action){
            return state.map(t=>t.id===action.payload ? {...t,status:!t.status} : t)
        }
    }
})

const getTasks=()=>{
    return async dispatch=>{
        const tasks = await taskService.get()
        return dispatch(setTasks(tasks))
    }
}

const addTaskToDB=(task)=>{
    return async dispatch=>{
        const newTask = await taskService.post(task)
        return dispatch(addTaskToState(newTask))
    }
}

const removeTaskFromDB = (id)=>{
    return async dispatch=>{
        const taskToDelete = await taskService.remove(id)
        return dispatch(removeTaskFromState(id))
    }
}

const updateTaskFromDB = (id,task)=>{
    return async dispatch=>{
        const modifiedTask = await taskService.update(id,task)
        return dispatch(updateTaskFromState(id))
    }
}

export const taskReducer = taskSlice.reducer
export const {setTasks, addTaskToState, removeTaskFromState, updateTaskFromState} = taskSlice.actions
export {getTasks, addTaskToDB, removeTaskFromDB, updateTaskFromDB}