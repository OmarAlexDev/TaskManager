import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import userService from "../services/userService";
import taskService from "../services/taskService";
import loginService from "../services/loginService";
import { setLoggedUser } from "../reducers/userReducer";


const Login = (props) =>{
    const dispatch = useDispatch()
    const darkMode = useSelector(state=>state.darkmode)
    const [visible,setVisible] = React.useState(true)
    const [user,setUser] = React.useState({username:'',password:'',name:'',rePassword:''})
    const {handleToast} = props
    const navigate = useNavigate()
    
    const hideWhenVisible = {
        display: visible? 'none' : '',
        color: darkMode ==="LIGHT" ? "#2C3333" : "#E7F6F2",
        backgroundColor: darkMode ==="LIGHT" ? "#A5C9CA" : "#395B64",
    }
    const showWhenVisible = {
        display: visible? '' : 'none',
        color: darkMode ==="LIGHT" ? "#2C3333" : "#E7F6F2",
        backgroundColor: darkMode ==="LIGHT" ? "#A5C9CA" : "#395B64",
    }
    const buttonStyle={
        color: darkMode ==="LIGHT" ? "white" : "#395B64",
        backgroundColor: darkMode ==="LIGHT" ? "#395B64" : "#E7F6F2"
    }

    function signUser(){
        if((user.username && user.password && user.rePassword && user.name)!=''){
          if(user.password!==user.rePassword){
            return handleToast("Passwords unmatched", true)
          }
          userService.post(user)
            .then(res=>{
                loginUser()
            })
            .catch(err=>{     
                handleToast(err.response.data.error,true)
            })
        }else{
            handleToast("Missing one or more fields", true)
        }
    }
    
    function loginUser(){
        if(user.username!='' && user.password!=''){
          loginService.post(user)
            .then(res=>{
                handleToast("Access granted",false)
                setTimeout(function() {
                    dispatch(setLoggedUser(res))
                    taskService.setToken(res.token) 
                    window.localStorage.setItem('loggedUserTaskApp',JSON.stringify(res))
                    setUser({username:'',password:'',name:'',rePassword:''})
                    navigate('/')
                }, 2000)  
            })
            .catch(err=>{
                handleToast(err.response.data.error,true)
            })
        }else{
            handleToast("Missing one or more credentials",true)
        }
    }

    function changeVisibility(event){
        setVisible(prev=>!prev)
    }

    function handleChange(event){
        if(event.target.name=="username"){
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
        }
    }

    return(
        <div>
            <div className="creator section login" style={hideWhenVisible}>
                <p>NEW USERNAME</p>
                <input placeholder="---" onChange={()=>handleChange(event)} value={user.username} name="username"></input>
                <p>NEW NAME</p>
                <input placeholder="---" onChange={()=>handleChange(event)} value={user.name} name="name"></input>
                <p>NEW PASSWORD</p>
                <input type="password" placeholder="---" onChange={()=>handleChange(event)} value={user.password} name="password"></input>
                <p>RE-ENTER NEW PASSWORD</p>
                <input type="password" placeholder="---" onChange={()=>handleChange(event)} value={user.rePassword} name="rePassword"></input>
                <button onClick={signUser} className="button log" style={buttonStyle}>SIGN IN</button>
                <span onClick={changeVisibility} className="log-msg">Already an user?</span>
            </div>
            <div className="creator section login" style={showWhenVisible}>
                <p>USERNAME</p>
                <input placeholder="---" onChange={()=>handleChange(event)} value={user.username} name="username"></input>
                <p>PASSWORD</p>
                <input type="password" placeholder="---" onChange={()=>handleChange(event)} value={user.password} name="password"></input>
                <button onClick={loginUser} className="button log" style={buttonStyle}>LOGIN</button>
                <span onClick={changeVisibility} className="log-msg">Don´t have an account yet?</span>
            </div>  
        </div>
    )
}

export default Login