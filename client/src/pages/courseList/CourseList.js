import { useState, useEffect } from "react"
import Axios from "axios"
import ListDisplay from '../../components/ListDiplay'


const CourseList = () => {

    //This is the list of courses to be displayed
    const [courseList, setCourseList] = useState([])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "course"

    //Updates the list of courses
    useEffect(() => {
        const getCourses = async () => {
            const courses = await Axios.get("http://localhost:3001/api/get/courseList")
            const data = await courses.data
            setCourseList(data)
            console.log(courses)
            console.log(courses.data)
        }
        getCourses()
    }, [])

    //Call Listdisplay to render the list
    return(
        <div>
            <ListDisplay list = {courseList} type = {type} />
        </div>
    )
}

export default CourseList