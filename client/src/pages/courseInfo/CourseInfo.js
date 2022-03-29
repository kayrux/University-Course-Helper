import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const CourseInfo = () => {

    const [courseInformation, setCourseInformation] = useState(["Courses", "Professor Links", "Department Links", "Degree Links", "Comments/Ratings"])

    const type = "course"

    return(
        <div>
            <ListDisplay list = {courseInformation} type = {type} />
        </div>
    )
}

export default CourseInfo


