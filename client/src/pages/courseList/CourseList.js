import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';


const CourseList = () => {

    //This is the list of courses to be displayed
    const [courseList, setCourseList] = useState(["CPSC 231", "CPSC 319", "CPSC 331", "CPSC 457", "CPSC 471"])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "course"

    //Call Listdisplay to render the list
    return(
        <div>
            <ListDisplay list = {courseList} type = {type} />
        </div>
    )
}

export default CourseList