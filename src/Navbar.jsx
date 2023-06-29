import React, { useState } from "react";
import { Link } from "react-router-dom"

const NavBar = ({ token }) => {
    const handleUserProfile = () => {}
    const handleAuthentication = () => {}
    const handleFeed = () => {}

    return(
    <>
        <div>
            <Link to="/Profile" onClick={handleUserProfile}>Profile</Link>
        </div>
        <br />
        <div>
            <Link to="/Register" onClick={handleAuthentication}>Sign Up/Login</Link>
        </div>
        <br />
        <div>
            <Link to="/Home" onClick={handleFeed}>Home</Link>
        </div>
    </>
    )
}

export default NavBar;