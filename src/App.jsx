import React from "react";
import './App.css'
import {nanoid} from 'nanoid'

import TaskCreator from "./components/TaskCreator";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import Login from "./components/Login";

import taskService from './services/taskService'
import loginService from "./services/loginService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

const App = () => {
  
  const [tasks,setTasks] = React.useState([])
  const [finishedStatus,setFinishedStatus] = React.useState(false)
  const [filter,setFilter] =React.useState('')
  const [newTask, setNewTask] = React.useState({responsible:"",content:""})
  const [emptyInput, setEmptyInput] = React.useState({msg:"",on:false})
  const [user,setUser] = React.useState({username:"",password:""})
  const [loggedUser,setLoggedUser] = React.useState(null)
  
  React.useEffect(()=>{
    taskService.get()
      .then(res=>{
        setTasks(res)})
  },[])

  React.useEffect(()=>{
    let savedUser = window.localStorage.getItem('loggedUserTaskApp')
    if(savedUser!==null){
      savedUser = JSON.parse(savedUser)
      setLoggedUser(savedUser)
      taskService.setToken(savedUser.token)   
    }
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
    }else if(event.target.id=="username"){
      setUser(prev=>{ 
        return {...prev,username: event.target.value}
      })
    }else if(event.target.id=="password"){
      setUser(prev=>{ 
        return {...prev,password: event.target.value}
      })
    }else{
      setFilter(event.target.value)
    }
  }

  function updateStatus(id){
    let modifTask = tasks.find(t=>t.id==id)
    if(modifTask){
      modifTask={
        ...modifTask,
        "status": !modifTask.status
      }
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

  function showAlert(message){
    setEmptyInput(message)
    setTimeout(function() {
      setEmptyInput({msg:"", on:false})
    }, 2000)
  }

  function createTask(){
    if(newTask.content!="" && newTask.responsible!=""){
      const task ={
        ...newTask,
        status: false
      }
      taskService.post(task)
        .then(res=>{
        console.log(res)
        setTasks(prev=>prev.concat(res))
        setNewTask({responsible:"",content:""}) 
        showAlert({msg:"Task Added", on:true})
        setTimeout(function() {
          scroll("top-arrow")
        },1500)
        })
        .catch(err=>{
          showAlert({msg:"Error, something happened...", on:true})
        })

    }else{  
      showAlert({msg:"Not enough data", on:true})
    }
  }

  function deleteTask(id){
    taskService.remove(id).then(res=>{
      setTasks(prevTasks=>prevTasks.filter(t=>t.id!=id))
    })
  }

  function loginUser(){
    if(user.username!='' && user.password!=''){
      loginService.post(user)
        .then(res=>{
          showAlert({msg: "Access granted", on:true})
          setTimeout(function() {
            setLoggedUser(res)
            window.localStorage.setItem('loggedUserTaskApp',JSON.stringify(res))
            setUser({username:"",password:""})
          }, 2000)  
        })
        .catch(err=>{
          showAlert({msg: err.response.data.error, on:true})
        })
    }else{
      showAlert({msg:"Missing one or more credentials", on:true})
    }
  }

  function logoutUser(){
    window.localStorage.removeItem('loggedUserTaskApp')
    setLoggedUser(null)
  }

  function scroll(id){
    let section
    if(id=="bottom-arrow"){
       section = document.querySelector('#top');
    }else{
      section = document.querySelector('#bottom');
    }
    section!=undefined ? section.scrollIntoView( { behavior: 'smooth', block: 'start' } ) : null
  }

  const input_filter = filter != '' ? tasks.filter(t=>t.content.includes(filter) || t.responsible.includes(filter) || (new Date(t.date).toDateString()).includes(filter)) : tasks 
  const finished_filter = finishedStatus ? input_filter.filter(t=>t.status==true) : input_filter

  const showed_tasks = finished_filter.map((currTask,index)=>{
    return <TaskList key={nanoid()} handleClick={updateStatus} task_info={currTask} handleDelete={deleteTask} place={index}/>
  })

  return (
    <div className="app">
      <div className="nav" onClick={logoutUser}>CHECKED</div>
      {
        !loggedUser ?
          <Login user={user}  handleChange={handleChange} emptyText={emptyInput} loginUser={loginUser}/> 
        :
        <>
          <TaskCreator emptyText={emptyInput} handleClick={createTask} handleChange={handleChange} newTask={newTask}/>
          <div className="section view-list">
            <TaskFilter finished={finishedStatus} filterVal={filter} handleChange={handleChange}/>
            {showed_tasks.length>0 ?
            <div className="lister">
              <FontAwesomeIcon icon={faArrowRight} className="arrow-icon l" onClick={()=>scroll("top-arrow")} id="top"/>
              {showed_tasks}
              <FontAwesomeIcon icon={faArrowRight} className="arrow-icon r" onClick={()=>scroll("bottom-arrow")} id="bottom"/>
            </div>
            : <p id="no-note">No tasks available</p>}
          </div> 
        </>
      }
    </div>
  )
}
export default App