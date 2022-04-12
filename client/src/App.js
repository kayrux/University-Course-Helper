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
import auth from "./context/Auth";
import { Navigate } from "react-router-dom";

const App = () => {
    const [showLoggedInAsAdmin, setLoggedAsAdmin] = useState(false) // Keep track of whether the user is logged in as admin

    // Updates whether user is logged in
    useEffect(() => {
        auth.isAuthenticated() ? setLoggedAsAdmin(true): setLoggedAsAdmin(false)
    }, [])

    // Logs in a user
    const login = (loginInfo) => {
        setLoggedAsAdmin(true) 
        //setUsername(loginInfo.username)
        auth.login(() => {
            // Redirects to home page
            <Navigate to={"/"} />
        }, loginInfo);
        console.log("Logging in: " + loginInfo.username)
    }

    const logout = (loginInfo) => {
        console.log("Logging out")
        auth.logout(() => {
            // Redirects to home page
            <Navigate to={"/"} />
        })
        setLoggedAsAdmin(false) 
        //setUsername(null)
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
                    <Route path="/reports" element={
                        // Report page only accessible for logged in users
                        <RequireAuth redirectTo="/login">
                            <ReportList />
                        </RequireAuth>
                    } />
                    <Route path="/login" element={
                        // Prevents logged in users from accessing login page
                        <RequireNotAuth redirectTo="/">
                            <LoginContainer onLogin={login}/>
                        </RequireNotAuth>
                    } />
                    <Route path="/edit-account" element={
                        // Edit account page only accessible for logged in users
                        <RequireAuth redirectTo="/">
                            <EditAccountContainer />
                        </RequireAuth>
                    } />
                    <Route path="/courses/:courseId" element={<CourseInfo />}></Route>
                    <Route path="/degrees/:degreeId" element={<DegreeInfo />}></Route>
                    <Route path="/reports/:reportId" element={showLoggedInAsAdmin ? <ReportInfo /> : <LoginContainer onLogin={login}/>}></Route>
                    <Route path="/professors/:professorId" element={<ProfessorInfo />}></Route>
                </Routes>
                <b>{showLoggedInAsAdmin ? <Footer loggedIn={showLoggedInAsAdmin}/> : "" } </b>
            </div>
        </Router>
    )
}

// Makes sure a user is authenticated before allowing them to access a route
function RequireAuth({ children, redirectTo } ) {
    let isAuthenticated = auth.isAuthenticated()
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function RequireNotAuth({ children, redirectTo } ) {
    let isAuthenticated = auth.isAuthenticated()
    return (!auth.isAuthenticated()) ? children : <Navigate to={redirectTo} />;
}

export default App;
