import AddRaitingContainer from "./AddRatingContainer"
import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import Axios from "axios"

const CourseInfo = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2];

    const [courseInfo, setCourseInfo] = useState([])
    const [CN, SCN] = useState("")

    //Updates the list of courses
    useEffect(() => {
        const getCourses = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/get/courseInfo/${path}`)
            const data = await courses.data
            setCourseInfo(data)
            console.log(courses)
            console.log(courses.data)
            console.log(courses.data.Course_name)
        }
        getCourses()
    }, [])

    return(
        <div>
            <div>
            hello
            </div>
            <div>
            Can read course ID via url: {path}
            </div>
            <div>
            Cant use course ID to read from database:
            (course name corasponding to the given ID should be here)
            {courseInfo.Course_name}
            {courseInfo.map((val) => {
            return(
                        <h2>
                            {val.Course_name}
                        </h2>
                    );
                })}

            {CN}
            </div>
        </div>
    )
    
    
    /*
    <div className="display-container">
        <h1></h1> 
            <div>
            <h3>General Information</h3>
            <div>
            Description: Fundamental data structures, including arrays, lists, stacks, queues, trees, hash tables, and graphs. Algorithms for searching and sorting. Introduction to the correctness and analysis of algorithms. For computer science majors and those interested in algorithm design and analysis, information security, and other mathematically-intensive areas.
            </div>
            <div>
            Hours: (3-2T)
            </div>
            <div>
            Prerequisites: One of Computer Science 219, 233, 235 or Computer Engineering 339 and one of Mathematics 271 or 273.
            </div>
            Antirequisites: Credit for Computer Science 331 and 319 will not be allowed.
        <h3>Offered</h3>
            <h4>Fall 2021</h4>
                <div>
                Professor: Wayne Michael Eberly
                </div>
                <div>
                *insert link to page for Wayne Michael Eberly
                </div>
                <div>
                Syllabus:  https://contacts.ucalgary.ca/info/cpsc/files/info/unitis/courses/CPSC331/F2019/CPSC331-F2019-syllabus.pdf
                </div>
            <h4>Spring 2021</h4>
                <div>
                Professor: Phillip Fong
                </div>
                <div>
                *insert link to page for Phillip Fong
                </div>
                <div>
                Syllabus: https://contacts.ucalgary.ca/info/cpsc/files/info/unitis/courses/CPSC331/P2021/LEC1/CPSC331-P2021-LEC1-outline.pdf
                </div>
        <h3>Faculty</h3>
                <div>
                Faculty of Science
                </div>
                <div>
                *insert link to page for Faculty of science
                </div>
                <div>
                relevant to: CPSC Degree
                </div>      
        <h3>Ratings</h3>
        <div>
            2.5/5
        </div>
        <div>
            Luigi is cooler than this course
        </div>
        <AddRaitingContainer />
        </div>
    </div>
    */
}

export default CourseInfo


