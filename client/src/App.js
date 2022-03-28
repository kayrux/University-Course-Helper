import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import LoginContainer from "./pages/login/LoginContainer";

const App = () => {
    const [showLoggedInAsAdmin, setLoggedAsAdmin] = useState(false) // Keep track of whether the user is logged in as admin

    // TO DO: interacts with database to verify before logging in
    const login = (loginInfo) => {
        console.log("Logging in") // Assume login successful
        setLoggedAsAdmin(true) 
    }

    const logout = (loginInfo) => {
        console.log("Logging out") // Assume login successful
        setLoggedAsAdmin(false) 
    }

    return ( 
        <Router>
            <div className="container">
                <Navbar onLogout={logout} loggedIn={showLoggedInAsAdmin}/>
                <Routes>
                    // Replace elements with corresponding components
                    <Route path="/" element={<h1>Courses</h1>}></Route>
                    <Route path="/professors" element={<h1>Professors</h1>}></Route>
                    <Route path="/faculties" element={<h1>Faculties</h1>}></Route>
                    <Route path="/reports" element={<h1>Reports</h1>}></Route>
                    <Route path="/login" element={<LoginContainer onLogin={login}/>}></Route>
                    <Route path="/edit-account" element={<h1>Edit Account</h1>}></Route>
                </Routes>
                <Footer loggedIn={showLoggedInAsAdmin}/>
            </div>
        </Router>
    )
}

export default App;
