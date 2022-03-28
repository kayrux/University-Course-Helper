import { Link } from "react-router-dom";

const Footer = ({loggedIn}) => {
  return (
    <div className="footer">
        <div className="links">
            {loggedIn && <Link to="/reports">View Reports</Link>}
        </div>
    </div>
  )
}

export default Footer