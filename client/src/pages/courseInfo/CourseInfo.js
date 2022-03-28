import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const CourseInformation = () => {

    const [courseInformation, setCourseInformation] = useState(["Courses", "Professor Links", "Department Links", "Degree Links", "Comments/Ratings"])

    const type = "courseInfo"

    return(
        <div>
            <ListDisplay list = {courseInformation} type = {type} />
        </div>
    )
}

export default CourseInformation


