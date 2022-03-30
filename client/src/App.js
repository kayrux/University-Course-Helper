import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import CourseList from "./pages/courseList/CourseList";
import ProfessorList from "./pages/professorList/ProfessorList";
import FacultyList from "./pages/facultyList/FacultyList";
import ReportList from "./pages/reportList/ReportList";
import LoginContainer from "./pages/login/LoginContainer";
import EditAccountContainer from "./pages/editAccount/EditAccountContainer";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import FacultyInfo from "./pages/facultyInfo/FacultyInfo";

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
                    <Route path="/" element={<CourseList />}></Route>
                    <Route path="/professors" element={<ProfessorList />}></Route>
                    <Route path="/faculties" element={<FacultyList />}></Route>
                    <Route path="/reports" element={<ReportList />}></Route>
                    <Route path="/login" element={<LoginContainer onLogin={login}/>}></Route>
                    <Route path="/edit-account" element={<EditAccountContainer />}></Route>
                    {/*Below path is for luigi image (delete if you hate luigi)*/}
                    <Route path="/:courseId" element={<CourseInfo />}></Route>
                    <Route path="/faculties/:facultyId" element={<FacultyInfo />}></Route>
                </Routes>
                <Footer loggedIn={showLoggedInAsAdmin}/>
            </div>
        </Router>
    )
}

export default App;
