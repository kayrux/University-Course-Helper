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
<<<<<<< HEAD
import ReportInfo from "./pages/reportInfo/ReportInfo";
=======
import ProfessorInfo from "./pages/professorInfo/ProfessorInfo";
>>>>>>> 8eea7d1b3475695768cff39d93a7957ae3edd69b

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
                    <Route path="/:courseId" element={<CourseInfo />}></Route>
                    <Route path="/faculties/:facultyId" element={<FacultyInfo />}></Route>
<<<<<<< HEAD
                    <Route path="/reports/:reportId" element={<ReportInfo />}></Route>
=======
                    <Route path="/professors/:professorId" element={<ProfessorInfo />}></Route>
>>>>>>> 8eea7d1b3475695768cff39d93a7957ae3edd69b
                </Routes>
                <b>{showLoggedInAsAdmin ? <Footer loggedIn={showLoggedInAsAdmin}/> : "" } </b>
            </div>
        </Router>
    )
}

export default App;
