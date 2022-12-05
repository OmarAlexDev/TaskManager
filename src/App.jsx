import React from "react";
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux'

import TaskCreator from "./components/TaskCreator";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import Login from "./components/Login";
import Nav from "./components/Nav"

import taskService from './services/taskService'

import {setLoggedUser} from './reducers/userReducer';

const App = () => {

  const dispatch = useDispatch()
  const loggedUser = useSelector(state=>state.user)
  const darkMode = useSelector(state=>state.darkmode)

  const [finishedStatus,setFinishedStatus] = React.useState(false)
  const [filter,setFilter] =React.useState('')
  const listStyle = {
    color: darkMode ==="LIGHT" ? "#E7F6F2" : "#A5C9CA",
    backgroundColor: darkMode ==="LIGHT" ? "#2C3333" : "#2C3333",
  }
  
  React.useEffect(()=>{
    let savedUser = window.localStorage.getItem('loggedUserTaskApp')
    if(savedUser!==null){
      savedUser = JSON.parse(savedUser)
      dispatch(setLoggedUser(savedUser))
      taskService.setToken(savedUser.token)   
    }
  },[])

  function handleChange(event){
    if(event.target.type=="checkbox"){
      setFinishedStatus(prev=>!prev)
    }else{
      setFilter(event.target.value)
    }
  }

  function handleToast(content,isError){
    isError ? toast.error(content) : toast.success(content)
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

  return (
    <div className="app">
      <Nav/>
      <div>
            <Toaster toastOptions={{className: '', duration: 2000, style: {} }}/>
      </div>
      {
        loggedUser===null ? <Login handleToast={handleToast}/> 
        :
        <>
          <TaskCreator handleToast={handleToast} scroll={scroll}/>
          <div className="section view-list" style={listStyle}>
            <TaskFilter finished={finishedStatus} filterVal={filter} handleChange={handleChange}/>
            <TaskList filter={filter} handleToast={handleToast} finishedStatus={finishedStatus} scroll={scroll}/>
          </div> 
        </>
      }
    </div>
  )
}
export default App