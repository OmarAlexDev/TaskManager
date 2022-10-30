import React from "react";

const TaskList = (props) =>{

    const {id,content,date,status,responsible} =props.task_info

    const prettyDate= new Date(date).toDateString();

    const styles={
        color: status ? "green" : "red"
    }

    return(
        <div className="task-el">
            <div className="task-sec id">
                Task #{props.place+1}
            </div>
            <div className="task-sec">
                <p>Task: {content}</p>
                <p>Responsible: {responsible}</p>
                <p>Created: {prettyDate}</p>
                <p>Status: <span style={styles} className="status">{status ? "Terminated" : "Pending"}</span></p>
                <div className="task-buttons">
                    <button onClick={()=>props.handleClick(id)} className="button-lister">{status? "Uncheck" : "Check"}</button>
                    <button onClick={()=>props.handleDelete(id)} className="button-lister">Remove</button>
                </div>
            </div>
        </div>
    )
}

export default TaskList