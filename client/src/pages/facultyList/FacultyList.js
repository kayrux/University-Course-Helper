import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const FacultyList = () => {

    const [facultyList, setFacultyList] = useState(["faculty of science"])

    const type = "faculty"

    return(
        <div>
            <ListDisplay list = {facultyList} type = {type} />
        </div>
    )
}

export default FacultyList