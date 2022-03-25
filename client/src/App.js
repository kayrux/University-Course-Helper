import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Login from "./pages/login/Login";

const App = () => {
    const [showLoggedAsAdmin, setLoggedAsAdmin] = useState(false) // Keep track of whether the user is logged in as admin

    // TO DO: interacts with database to verify before logging in
    const login = (loginInfo) => {
        console.log("Logging in") // Assume login successful
        setLoggedAsAdmin(true) 
    }

    return ( 
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    // Replace elements with corresponding components
                    <Route path="/" element={<h1>Courses</h1>}></Route>
                    <Route path="/professors" element={<h1>Professors</h1>}></Route>
                    <Route path="/faculties" element={<h1>Faculties</h1>}></Route>
                    <Route path="/reports" element={<h1>Reports</h1>}></Route>
                    <Route path="/login" element={<Login onLogin={login}/>}></Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App;
