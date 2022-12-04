import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleInfo, faCircleXmark} from '@fortawesome/free-solid-svg-icons'

const TaskList = (props,refs) =>{
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
                    <p>Task: {content}</p>
                    <p>Responsible: {responsible}</p>
                    <p>Created: {prettyDate}</p>
                    <p>Status: <span style={status_style} className="status">{status ? "Terminated" : "Pending"}</span></p>
                    <div className="task-buttons">
                        <button onClick={()=>props.handleClick(id)} className="button-lister">{status? "Uncheck" : "Check"}</button>
                        <button onClick={()=>props.handleDelete(id)} className="button-lister">Remove</button>
                    </div>
                    <div className="task-buttons icons"  onClick={changeVisibility}>
                        <FontAwesomeIcon icon={faCircleXmark} className="info-icon"/>
                    </div>             
                </div>
                <div id="shownInfo" style={showWhenVisible} >
                    <p>Task: {content}</p>
                    <p>Status: <span style={status_style} className="status">{status ? "Terminated" : "Pending"}</span></p>
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

export default TaskList