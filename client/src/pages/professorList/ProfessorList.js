import { useState } from "react"
import ListDisplay from '../../components/ListDiplay';

const ProfessorList = () => {

    const [professorList, setProfessorList] = useState(["Eberly", "Pavol", "Reda", "Kashfia"])

    const type = "professor"

    return(
        <div>
            <ListDisplay list = {professorList} type = {type} />
        </div>
    )
}

export default ProfessorList