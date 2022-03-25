import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="/login">Login</Link>
        </div>
        
    </div>
  )
}

export default Navbar