import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const CourseList = () => {

    const [courseList, setCourseList] = useState(["cpsc 331", "cpsc 457", "cpsc 471"])

    const type = "course"

    return(
        <div>
            <ListDisplay list = {courseList} type = {type} />
        </div>
    )
}

export default CourseList