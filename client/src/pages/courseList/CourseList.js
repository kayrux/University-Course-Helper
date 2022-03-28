import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const CourseList = () => {

    const [courseList, setCourseList] = useState(["CPSC 331", "CPSC 457", "CPSC 471"])

    const type = "course"

    return(
        <div>
            <ListDisplay list = {courseList} type = {type} />
        </div>
    )
}

export default CourseList