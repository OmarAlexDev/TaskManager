import React from "react";
import './App.css'
import {nanoid} from 'nanoid'
import toast, { Toaster } from 'react-hot-toast';

import TaskCreator from "./components/TaskCreator";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import Login from "./components/Login";
import Nav from "./components/Nav"

import taskService from './services/taskService'
import loginService from "./services/loginService";
import userService from "./services/userService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

const App = () => {
  
  const [tasks,setTasks] = React.useState([])
  const [finishedStatus,setFinishedStatus] = React.useState(false)
  const [filter,setFilter] =React.useState('')
  const [newTask, setNewTask] = React.useState({responsible:"",content:""})
  const [user,setUser] = React.useState({username:'',password:'',name:'',rePassword:''})
  const [loggedUser,setLoggedUser] = React.useState(null)
  const [divHeight, setDivHeight] = React.useState()

  const input_filter = filter != '' ? tasks.filter(t=>t.content.includes(filter) || t.responsible.includes(filter) || (new Date(t.date).toDateString()).includes(filter)) : tasks 
  const finished_filter = finishedStatus ? input_filter.filter(t=>t.status==true) : input_filter
  const showed_tasks = finished_filter.map((currTask,index)=>{
    return <TaskList key={nanoid()} handleClick={updateStatus} task_info={currTask} handleDelete={deleteTask} place={index}/>
  })
  
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
    }else if(event.target.name=="task"){
      setNewTask(prevTask=>{ 
        return {...prevTask,content: event.target.value}
      })
    }else if(event.target.name=="responsible"){
      setNewTask(prevTask=>{ 
        return {...prevTask,responsible: event.target.value}
      })
    }else if(event.target.name=="username"){
      setUser(prev=>{ 
        return {...prev,username: event.target.value}
      })
    }else if(event.target.name=="password"){
      setUser(prev=>{ 
        return {...prev,password: event.target.value}
      })
    }else if(event.target.name=="name"){
      setUser(prev=>{ 
        return {...prev,name: event.target.value}
      })
    }else if(event.target.name=="rePassword"){
      setUser(prev=>{ 
        return {...prev,rePassword: event.target.value}
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
            return {...task, status:!task.status}
          }else{
            return task
          }
        }))
        toast.success('Modified task!')
      })
      .catch(err=>{
        toast.error(err.response.data.error)
      })
    }
  }

  function createTask(){
    if(newTask.content!="" && newTask.responsible!=""){
      const task ={
        ...newTask,
        status: false
      }
      taskService.post(task)
        .then(res=>{
          setTasks(prev=>prev.concat(res))
          setNewTask({responsible:"",content:""}) 
          toast.success('Task added!')
          setTimeout(function() {
            scroll("top-arrow")
          },1500)
        })
        .catch(err=>{
          toast.error(err.response.data.error)
        })

    }else{ 
      toast.error("Missing fields")
    }
  }

  function deleteTask(id){
    taskService.remove(id)
      .then(res=>{
        setTasks(prevTasks=>prevTasks.filter(t=>t.id!==id))
        toast.success('Task deleted!')
      })
      .catch(err=>{
        toast.error(err.response.data.error)
      })
  }

  function signUser(){
    if((user.username && user.password && user.rePassword && user.name)!=''){
      if(user.password!==user.rePassword){
        return toast.error("Passwords unmatched")
      }
      userService.post(user)
        .then(res=>{
          loginUser()
        })
        .catch(err=>{     
          toast.error(err.response.data.error)
        })
    }else{
      toast.error("Missing one or more fields")
    }
  }

  function loginUser(){
    if(user.username!='' && user.password!=''){
      loginService.post(user)
        .then(res=>{
          toast.success("Access granted")
          setTimeout(function() {
            setLoggedUser(res)
            taskService.setToken(res.token) 
            window.localStorage.setItem('loggedUserTaskApp',JSON.stringify(res))
            setUser({username:'',password:'',name:'',rePassword:''})
          }, 2000)  
        })
        .catch(err=>{
          toast.error(err.response.data.error)
        })
    }else{
      toast.error("Missing one or more credentials")
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

  function retrieveheight(divHeight){
    setDivHeight(divHeight)
  }

  return (
    <div className="app">
      <Nav logoutUser={logoutUser} loggedUser={loggedUser} divHeight={divHeight}/>
      <div>
            <Toaster toastOptions={{className: '', duration: 2000, style: {} }}/>
      </div>
      {
        !loggedUser ?
          <Login user={user}  handleChange={handleChange} loginUser={loginUser} signUser={signUser}/> 
        :
        <>
          <TaskCreator handleClick={createTask} handleChange={handleChange} newTask={newTask} retrieveheight={retrieveheight}/>
          <div className="section view-list">
            <TaskFilter finished={finishedStatus} filterVal={filter} handleChange={handleChange}/>
            {showed_tasks.length>0 ?
            <div className="lister">
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