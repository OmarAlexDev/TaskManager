import React from "react";

const Nav = (props)=>{
    const [navStyle,setNavStyle] = React.useState({color:"#1F1D1D"})
    const {loggedUser,logoutUser,divHeight} = props

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