import React from "react";

const TaskCreator = (props) =>{
    const {handleClick,newTask,handleChange} = props

    return(
        <div className="creator section">
            <p>CREATE A NEW TASK</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={newTask.content} name="task"></input>
            <p>ASSING A NEW RESPONSIBLE</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={newTask.responsible} name="responsible"></input>
            <button onClick={handleClick} className="button log">GENERATE</button>
        </div>
    )
}

export default TaskCreator