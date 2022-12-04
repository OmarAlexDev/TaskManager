import React from "react";
import {useDispatch} from 'react-redux'
import { addTaskToDB } from "../reducers/taskReducer";

const TaskCreator = (props) =>{
    const dispatch = useDispatch()
    const [newTask, setNewTask] = React.useState({responsible:"",content:""})
    const {retrieveheight, handleToast,scroll} = props
    const ref = React.useRef(null)

    React.useEffect(() => {
        retrieveheight(ref.current.clientHeight)
    },[])

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
        <div className="creator section" ref={ref}>
            <p>CREATE A NEW TASK</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={newTask.content} name="task"></input>
            <p>ASSING A NEW RESPONSIBLE</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={newTask.responsible} name="responsible"></input>
            <button onClick={createTask} className="button log">GENERATE</button>
        </div>
    )
}

export default TaskCreator