import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import { addTaskToDB } from "../reducers/taskReducer";

const TaskCreator = (props) =>{
    const dispatch = useDispatch()
    const darkMode = useSelector(state=>state.darkmode)
    const [newTask, setNewTask] = React.useState({responsible:"",content:""})
    const {retrieveheight, handleToast,scroll} = props
    const sectionStyle = {
        color: darkMode ==="LIGHT" ? "#2C3333" : "#E7F6F2",
        backgroundColor: darkMode ==="LIGHT" ? "#A5C9CA" : "#395B64",
    }
    const buttonStyle={
        color: darkMode ==="LIGHT" ? "white" : "#395B64",
        backgroundColor: darkMode ==="LIGHT" ? "#395B64" : "#E7F6F2"
    }

    function createTask(){
        if(newTask.content!="" && newTask.responsible!=""){
            const task ={
                ...newTask,
                status: false
            }
            dispatch(addTaskToDB(task))
                .then(res=>{
                    setNewTask({responsible:"",content:""})
                    handleToast('Task added!',false) 
                    setTimeout(function() {
                        scroll("top-arrow")
                    },1500)
                })
                .catch(err=>{
                    handleToast(err.response.data.error,true)
                })
        }else{ 
            handleToast("Missing fields",true)
        }
    }
    
    function handleChange(event){
        if(event.target.name=="task"){
            setNewTask(prevTask=>{ 
              return {...prevTask,content: event.target.value}
            })
        }else if(event.target.name=="responsible"){
            setNewTask(prevTask=>{ 
              return {...prevTask,responsible: event.target.value}
            })
        }
    }

    return(
        <div className="creator section" style={sectionStyle}>
            <p>CREATE A NEW TASK</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={newTask.content} name="task"></input>
            <p>ASSING A NEW RESPONSIBLE</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={newTask.responsible} name="responsible"></input>
            <button onClick={createTask} className="button log" style={buttonStyle}>GENERATE</button>
        </div>
    )
}

export default TaskCreator