import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';

const App = () => {
    return ( 
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    // Replace elements with corresponding components
                    <Route path="/" element={<h1>Courses</h1>}></Route>
                    <Route path="/professors" element={<h1>Professors</h1>}></Route>
                    <Route path="/faculty" element={<h1>Faculty</h1>}></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
