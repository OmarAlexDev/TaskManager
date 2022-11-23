import React from "react";

const Login = (props) =>{
    const [visible,setVisible] = React.useState(true)
    const {user,handleChange,loginUser, signUser} = props

    const hideWhenVisible = {display: visible? 'none' : ''}
    const showWhenVisible = {display: visible? '' : 'none'}

    function changeVisibility(event){
        setVisible(prev=>!prev)
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
                <span onClick={changeVisibility} className="log-msg">Already an user?</span>
            </div>
            <div className="creator section login" style={showWhenVisible}>
                <p>USERNAME</p>
                <input placeholder="---" onChange={()=>handleChange(event)} value={user.username} name="username"></input>
                <p>PASSWORD</p>
                <input type="password" placeholder="---" onChange={()=>handleChange(event)} value={user.password} name="password"></input>
                <button onClick={loginUser} className="button log">LOGIN</button>
                <span onClick={changeVisibility} className="log-msg">Don´t have an account yet?</span>
            </div>  
        </div>
    )
}

export default Login