import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import auth from "../context/Auth";

/**
 * 
 * @param onLogout function which is called when the user logs out
 * @param loggedIn whether or not the user is logged in 
 * @returns
 */
const Navbar = ({onLogout, loggedIn}) => {

    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Courses</Link>
                <Link to="/professors">Professors</Link>
                <Link to="/degrees">Degrees</Link>
                <input 
                    type="text" 
                    placeholder="Search" 
                />
                {/* Logout button is displayed only when user is logged in */}
                {loggedIn ? <Link to="/"><Button text="Logout" color="red" onClick={onLogout}></Button></Link>
                : <Link to="/login">Login</Link>}

                {/* Edit Account button is displayed only when user is logged in */}
                {loggedIn && <Link to="/edit-account"><Button text="Edit Account" color="grey"></Button></Link>}
            </div>
            
        </div>
    )
}

export default Navbar