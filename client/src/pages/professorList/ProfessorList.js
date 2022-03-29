import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const ProfessorList = () => {

    //This is the list of professors to be displayed
    const [professorList, setProfessorList] = useState(["Eberly", "Pavol", "Reda", "Kashfia"])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "professor"

    //Call Listdisplay to render the list
    return(
        <div>
            <ListDisplay list = {professorList} type = {type} />
        </div>
    )
}

export default ProfessorList