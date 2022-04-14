import { Link } from "react-router-dom";
import Button from "./Button";


/**
 * 
 * @param onLogout function which is called when the user logs out
 * @param loggedIn whether or not the user is logged in 
 * @returns
 */
const Navbar = ({onLogout, loggedIn}) => {

    // Return a list of links to be displayed on the navbar
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Courses</Link>
                <Link to="/professors">Professors</Link>
                <Link to="/degrees">Degrees</Link>
                {/* Logout button is displayed only when user is logged in */}
                {loggedIn ? <Link to="/"><Button text="Logout" color="red" onClick={onLogout}></Button></Link>
                : <Link to="/login"><Button text="Login" color="purple"></Button></Link>}

                {/* Edit Account button is displayed wen logged in and create account button is displayed when logged out */}
                {loggedIn ? <Link to="/edit-account"><Button text="Edit Account" color="grey"></Button></Link>
                : <Link to="/create-account"><Button text="Create Admin Account" color="yellow"></Button></Link>}

                {loggedIn && <Link to="/reports">Reports</Link>}
            </div>
            
        </div>
    )
}

export default Navbar