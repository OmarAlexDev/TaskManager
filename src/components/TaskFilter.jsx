import React from "react";

const TaskFilter = (props) =>{

    const {finished,filter,handleChange} = props
    return (
        <div className="filter" id="top">
            <p>Filter Tasks:</p>
            <input placeholder="Find The One" value={props.filter} onChange={()=>handleChange(event)}></input>
            <p>Only Terminated</p>
            <input className="check" type="checkbox" value={finished} onChange={()=>handleChange(event)}></input>
        </div>
    )
}

export default TaskFilter