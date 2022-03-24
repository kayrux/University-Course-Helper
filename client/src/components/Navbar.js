import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="links">
            <Link to="/">Courses</Link>
            <Link to="/professors">Professors</Link>
            <Link to="/faculty">Faculty</Link>
        </div>
    </div>
  )
}

export default Navbar