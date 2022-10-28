import React from "react";
import './App.css'
import {nanoid} from 'nanoid'

import TaskCreator from "./components/TaskCreator";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

import taskService from './services/taskService'

import data from '../db.json'

const App = () => {
  
  const [tasks,setTasks] = React.useState([])
  const [finishedStatus,setFinishedStatus] = React.useState(false)
  const [filter,setFilter] =React.useState('')
  const [newTask, setNewTask] = React.useState({responsible:"",content:""})
  const [emptyInput, setEmptyInput] = React.useState({msg:"",on:false})
  
  React.useEffect(()=>{
    taskService.get()
      .then(res=>{
        setTasks(res)})
      .catch(res=>{
        setTasks(data.tasks)
      })
  },[])

  function handleChange(event){
    if(event.target.type=="checkbox"){
      setFinishedStatus(prev=>!prev)
    }else if(event.target.id=="task"){
      setNewTask(prevTask=>{ 
        return {...prevTask,content: event.target.value}
      })
    }else if(event.target.id=="responsible"){
      setNewTask(prevTask=>{ 
        return {...prevTask,responsible: event.target.value}
      })
    }else{
      setFilter(event.target.value)
    }
  }

  function updateStatus(id){
    const modifTask = tasks.find(t=>t.id==id)
    if(modifTask){
      modifTask.status=!modifTask.status
      taskService.update(id,modifTask)
      .then(res=>{
        setTasks(prevTasks=>prevTasks.map(task=>{
          if(task.id==id){
            return {
              ...task, status:!task.status
            }
          }else{
            return task
          }
        }))
      })
      .catch(err=>{console.log(err)})
    }
  }

  function showAlert(){
    setTimeout(function() {
      let newI = {msg:"", on:false}
      setEmptyInput(newI)
    }, 2500);
  }

  function createTask(){
    let newI = {}
    if(newTask.content!="" && newTask.responsible!=""){
      const task ={
        ...newTask,
        status: false,
        date: new Date().toDateString(),
        id: tasks.length+1
      }
      taskService.post(task)
        .then(res=>{
        console.log("Note Added")
        newI = {msg:"Note Added", on:true}
        setEmptyInput(newI)
        showAlert()
        setTasks(prev=>prev.concat(task))
        })
        .catch(err=>{
          newI = {msg:"Error, something happened...", on:true}
          setEmptyInput(newI)
          showAlert()
        })

    }else{  
      newI = {msg:"Not enough data", on:true}
      setEmptyInput(newI)
      showAlert()
    }
  }

  const input_filter = filter != '' ? tasks.filter(t=>t.content.includes(filter) || t.responsible.includes(filter)) : tasks 
  const finished_filter = finishedStatus ? input_filter.filter(t=>t.status==true) : input_filter

  const showed_tasks = finished_filter.map(currTask=>{
    return <TaskList key={nanoid()} handleClick={updateStatus} task_info={currTask}/>
  })

  return (
    <div className="app">
      <div className="nav">CHECKED</div>
      <TaskCreator emptyText={emptyInput} handleClick={createTask} handleChange={handleChange} newTask={newTask}/>
      <div className="section view-list">
        <TaskFilter finished={finishedStatus} filterVal={filter} handleChange={handleChange}/>
        {showed_tasks.length>0 ?
        <div className="lister">
          {showed_tasks}
        </div>
        : <p id="no-note">No notes available</p>}
      </div> 
    </div>
  )
}

export default App