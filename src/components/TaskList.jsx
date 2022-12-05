import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleInfo, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {nanoid} from 'nanoid'

import { updateTaskFromDB, removeTaskFromDB, getTasks} from "../reducers/taskReducer";

const TaskCard = (props) =>{
    const [visible,setVisible] = React.useState(false)
    const {id,content,date,status,responsible} =props.task_info
    const prettyDate= new Date(date).toDateString();

    const status_style = {color: status ? "green" : "red"}
    const hideWhenVisible = {display: visible? "" : "none"}
    const showWhenVisible = {display: visible? "none" : ""}


    function changeVisibility(){
        setVisible(prev=>!prev)
    }

    return(
        <div className="task-el" id={props.place===0? "top": null}>
            <div className="task-sec id">
                Task #{props.place+1}
            </div>
            <div className="task-sec">
                <div id="hiddenInfo" style={hideWhenVisible} >
                    <p><span className="task-header">Task: </span>{content}</p>
                    <p><span className="task-header">Responsible: </span> {responsible}</p>
                    <p><span className="task-header">Created: </span>{prettyDate}</p>
                    <p><span className="task-header">Status: </span><span style={status_style} className="status">{status ? "Terminated" : "Pending"}</span></p>
                    <div className="task-buttons">
                        <button onClick={()=>props.handleClick(id)} className="button-lister">{status? "Uncheck" : "Check"}</button>
                        <button onClick={()=>props.handleDelete(id)} className="button-lister">Remove</button>
                    </div>
                    <div className="task-buttons icons"  onClick={changeVisibility}>
                        <FontAwesomeIcon icon={faCircleXmark} className="info-icon"/>
                    </div>             
                </div>
                <div id="shownInfo" style={showWhenVisible} >
                    <p><span className="task-header">Task: </span>{content}</p>
                    <p><span className="task-header">Status: </span><span style={status_style} className="status">{status ? "Terminated" : "Pending"}</span></p>
                    <div className="task-buttons">
                        <button onClick={()=>props.handleClick(id)} className="button-lister">{status? "Uncheck" : "Check"}</button>
                        <button onClick={()=>props.handleDelete(id)} className="button-lister">Remove</button>
                    </div>
                    <div className="task-buttons icons"  onClick={changeVisibility}>
                        <FontAwesomeIcon icon={faCircleInfo} className="info-icon"/>    
                    </div>
                </div>        
            </div>
        </div>
    )
}

const TaskList = (props)=>{
    const {filter,handleToast, finishedStatus, scroll} = props
    const tasks = useSelector(state=>state.tasks)
    const dispatch = useDispatch()

    const tasksFilteredByValue = tasks.filter(t=>t.content.includes(filter) || t.responsible.includes(filter) || (new Date(t.date).toDateString()).includes(filter))
    const tasksFilteredByStatus = finishedStatus ? tasksFilteredByValue.filter(t=>t.status==true) : tasksFilteredByValue
    const showed_tasks = tasksFilteredByStatus.map((currTask,index)=>{
        return <TaskCard key={nanoid()} task_info={currTask} handleClick={updateStatus} handleDelete={deleteTask} place={index}/>
    })

    React.useEffect(()=>{
        dispatch(getTasks())
    },[])

    function updateStatus(id){
        let modifTask = tasks.find(t=>t.id==id)
        if(modifTask){
          modifTask={
            ...modifTask,
            "status": !modifTask.status
          }
          dispatch(updateTaskFromDB(id,modifTask))
          .then(res=>{
            handleToast('Modified task!',false)
          })
          .catch(err=>{
            handleToast(err.response.data.error,true)
          })
        }
    }
    
    function deleteTask(id){   
        dispatch(removeTaskFromDB(id))
        .then(res=>{
            handleToast('Task deleted!',false)
        })
        .catch(err=>{
            handleToast(err.response.data.error,true)
        })
    }

    return(
        <>
            {showed_tasks.length>0 ?
            <div className="lister">
                {showed_tasks}
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon r" onClick={()=>scroll("bottom-arrow")} id="bottom"/>
            </div>
        : <p id="no-note">No tasks available</p>}
        </>
    )
}

export default TaskList