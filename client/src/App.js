import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

const App = () => {
    const [showLoggedAsAdmin, setLoggedAsAdmin] = useState(false) // Keep track of whether the user is logged in as admin


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
                    <Route path="/login" element={<h1>Login</h1>}></Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App;
