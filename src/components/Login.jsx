import React from "react";

const Login = (props) =>{
    const [visible,setVisible] = React.useState(true)
    const {user,handleChange,loginUser, signUser} = props

    const hideWhenVisible = {display: visible? 'none' : ''}
    const showWhenVisible = {display: visible? '' : 'none'}

    function changeVisibility(event){
        setVisible(prev=>!prev)
    }

    const bottonLogin=()=>{
        return(
            <>
            <span onClick={changeVisibility} className="log-msg">{visible? "Don´t have an account yet?": "Already an user?"}</span>   
            </> 
        )
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
                <button onClick={signUser} className="button log">SIGN IN</button>
                {bottonLogin()}
            </div>
            <div className="creator section login" style={showWhenVisible}>
                <p>USERNAME</p>
                <input placeholder="---" onChange={()=>handleChange(event)} value={user.username} name="username"></input>
                <p>PASSWORD</p>
                <input type="password" placeholder="---" onChange={()=>handleChange(event)} value={user.password} name="password"></input>
                <button onClick={loginUser} className="button log">LOGIN</button>
                {bottonLogin()}
            </div>  
        </div>
    )
}

export default Login