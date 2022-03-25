import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
        <div className="links">
            <Link to="/reports">View Reports</Link>
        </div>
    </div>
  )
}

export default Footer