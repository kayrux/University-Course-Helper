import { Link } from "react-router-dom";
import Button from "./Button";


const Navbar = ({onLogout, loggedIn}) => {
  return (
    <div className="navbar">
        <div className="links">
            <Link to="/">Courses</Link>
            <Link to="/professors">Professors</Link>
            <Link to="/faculties">Faculties</Link>
            <input 
                type="text" 
                placeholder="Search" 
            />
            {loggedIn ? <Link to="/"><Button text="Logout" color="red" onClick={onLogout}></Button></Link>
            : <Link to="/login">Login</Link>}
            {loggedIn && <Link to="/edit-account"><Button text="Edit Account" color="grey"></Button></Link>}
        </div>
        
    </div>
  )
}

export default Navbar