import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const FacultyList = () => {

    //This is the list of fauculties to be displayed
    const [facultyList, setFacultyList] = useState(["Faculty of Science"])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "faculty"

    //Call Listdisplay to render the list
    return(
        <div>
            <ListDisplay list = {facultyList} type = {type} />
        </div>
    )
}

export default FacultyList