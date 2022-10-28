import React from "react";

const TaskCreator = (props) =>{
    const {handleClick,newTask,handleChange,emptyText} = props

    return(
        <div className="creator section">
            <p>CREATE A NEW TASK</p>
            <input placeholder="Destroy DeathStar" onChange={()=>handleChange(event)} value={newTask.content} id="task"></input>
            <p>ASSING A NEW RESPONSIBLE</p>
            <input placeholder="Luke Skywalker" onChange={()=>handleChange(event)} value={newTask.responsible} id="responsible"></input>
            <button onClick={handleClick} className="button-creator">GENERATE</button>
            {emptyText.on ? <p>{emptyText.msg}</p> : ""}
        </div>
    )
}

export default TaskCreator