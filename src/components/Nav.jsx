import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { setLoggedUser} from "../reducers/userReducer";

const Nav = (props)=>{
  const dispatch = useDispatch()
  const loggedUser = useSelector(state=>state.user)
  const [navStyle,setNavStyle] = React.useState({color:"#1F1D1D"})
  const {divHeight} = props

  function logoutUser(){
    window.localStorage.removeItem('loggedUserTaskApp')
    dispatch(setLoggedUser(null))
  }

  document.addEventListener('scroll', (event) => {
    if(scrollY>=divHeight){
      setNavStyle({color:"white"})
    }else{
      setNavStyle({color:"#1F1D1D"})
    }
  })

  return(
    <div className="nav" onClick={logoutUser} style={navStyle}>
      <span>CHECKED</span>
      {loggedUser ? 
        <span className="nav-user">{loggedUser.username}</span> : ""}
      </div>
  )
}

export default Nav