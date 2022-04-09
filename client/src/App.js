import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import CourseList from "./pages/courseList/CourseList";
import ProfessorList from "./pages/professorList/ProfessorList";
import DegreeList from "./pages/degreeList/DegreeList";
import ReportList from "./pages/reportList/ReportList";
import LoginContainer from "./pages/login/LoginContainer";
import EditAccountContainer from "./pages/editAccount/EditAccountContainer";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import DegreeInfo from "./pages/degreeInfo/DegreeInfo";
import ReportInfo from "./pages/reportInfo/ReportInfo";
import ProfessorInfo from "./pages/professorInfo/ProfessorInfo";

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

    //renders current page as well as persistent elements, such as navbar
    return ( 
        <Router>
            <div className="container">
                <Navbar onLogout={logout} loggedIn={showLoggedInAsAdmin}/>
                <Routes>
                    <Route path="/" element={<CourseList />}></Route>
                    <Route path="/professors" element={<ProfessorList />}></Route>
                    <Route path="/degrees" element={<DegreeList />}></Route>
                    <Route path="/reports" element={<ReportList />}></Route>
                    <Route path="/login" element={<LoginContainer onLogin={login}/>}></Route>
                    <Route path="/edit-account" element={<EditAccountContainer />}></Route>
                    <Route path="/courses/:courseId" element={<CourseInfo />}></Route>
                    <Route path="/degrees/:degreeId" element={<DegreeInfo />}></Route>
                    <Route path="/reports/:reportId" element={<ReportInfo />}></Route>
                    <Route path="/professors/:professorId" element={<ProfessorInfo />}></Route>
                </Routes>
                <b>{showLoggedInAsAdmin ? <Footer loggedIn={showLoggedInAsAdmin}/> : "" } </b>
            </div>
        </Router>
    )
}

export default App;
