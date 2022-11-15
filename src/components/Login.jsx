import React from "react";

const Login = (props) =>{
    const {user,emptyText,handleChange,loginUser} = props
    return(
        <div className="creator section login">
            <p>USERNAME</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={user.username} id="username"></input>
            <p>PASSWORD</p>
            <input placeholder="---" onChange={()=>handleChange(event)} value={user.password} id="password"></input>
            <button onClick={loginUser} className="button-creator">LOGIN</button>
            {emptyText.on ? <p>{emptyText.msg}</p> : ""}
        </div>
    )
}

export default Login