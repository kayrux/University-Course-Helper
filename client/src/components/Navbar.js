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
            {loggedIn ? <Link to="/"><Button text="logout" color="red" onClick={onLogout}></Button></Link>
            : <Link to="/login">Login</Link>}
        </div>
        
    </div>
  )
}

export default Navbar