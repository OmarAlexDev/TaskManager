import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { setLoggedUser} from "../reducers/userReducer";
import { initializeDarkMode } from "../reducers/modeReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons'

const Nav = (props)=>{
  const dispatch = useDispatch()
  const loggedUser = useSelector(state=>state.user)
  const darkMode = useSelector(state=>state.darkmode)
  const {divHeight} = props
  const navStyle = {
    color: darkMode ==="LIGHT" ? "#1F1D1D" : "#E7F6F2",
  }

  React.useEffect(()=>{
    let savedDarkMode = window.localStorage.getItem('darkMode')
    if(savedDarkMode!==null){
      dispatch(initializeDarkMode(savedDarkMode))
    }
  },[])

  function logoutUser(){
    window.localStorage.removeItem('loggedUserTaskApp')
    dispatch(setLoggedUser(null))
  }

  function toggleDarkMode(){
    const newDM = darkMode!=="LIGHT" ? "LIGHT" : "DARK"
    dispatch(initializeDarkMode(newDM))
    window.localStorage.setItem('darkMode',newDM)
  }

  return(
    <div className="nav" style={navStyle}>
      <span onClick={logoutUser}>CHECKED</span>
      {loggedUser ? 
        <span className="nav-user">{loggedUser.username}</span> : ""}
      <FontAwesomeIcon icon={darkMode === "LIGHT" ? faToggleOff : faToggleOn} className="darkmode-icon" onClick={toggleDarkMode}/>  
    </div>
  )
}

export default Nav