import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleInfo, faCircleXmark} from '@fortawesome/free-solid-svg-icons'

const TaskList = (props) =>{
    const [visible,setVisible] = React.useState(false)
    const {id,content,date,status,responsible} =props.task_info
    const prettyDate= new Date(date).toDateString();

    const status_style = {
        color: status ? "green" : "red"
    }
    const hideWhenVisible = {
        display: visible? "" : "none"
    }
    const showWhenVisible = {
        display: visible? "none" : ""
    }

    function handleChange(){
        setVisible(prev=>!prev)
    }

    return(
        <div className="task-el">
            <div className="task-sec id">
                Task #{props.place+1}
            </div>
            <div className="task-sec">
                <div style={hideWhenVisible} >
                    <p>Task: {content}</p>
                    <p>Responsible: {responsible}</p>
                    <p>Created: {prettyDate}</p>
                    <p>Status: <span style={status_style} className="status">{status ? "Terminated" : "Pending"}</span></p>
                    <div className="task-buttons">
                        <button onClick={()=>props.handleClick(id)} className="button-lister">{status? "Uncheck" : "Check"}</button>
                        <button onClick={()=>props.handleDelete(id)} className="button-lister">Remove</button>
                    </div>
                    <div className="task-buttons icons"  onClick={handleChange}>
                        <FontAwesomeIcon icon={faCircleXmark} className="info-icon"/>
                    </div>             
                </div>
                <div style={showWhenVisible} >
                    <p>Task: {content}</p>
                    <p>Status: <span style={status_style} className="status">{status ? "Terminated" : "Pending"}</span></p>
                    <div className="task-buttons icons"  onClick={handleChange}>
                        <FontAwesomeIcon icon={faCircleInfo} className="info-icon"/>
                    </div>
                </div>        
            </div>
        </div>
    )
}

export default TaskList