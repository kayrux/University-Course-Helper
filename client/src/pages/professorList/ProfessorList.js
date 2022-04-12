import { useState, useEffect } from "react"
import Axios from "axios"
import ListDisplay from '../../components/ListDiplay';

const ProfessorList = () => {

    //This is the list of professors to be displayed
    const [professorList, setProfessorList] = useState([])
    const [search, setSearch] = useState([])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "professor"

    //Updates the list of professors
    useEffect(() => {
        const getProfessors = async () => {
            const Professors = await Axios.get("http://localhost:3001/api/profList")
            const data = await Professors.data
            setProfessorList(data)
        }
        getProfessors()
    }, [])

    //Call Listdisplay to render the list
    return(
        <div>
            <input 
                type="text" 
                placeholder="Search Courses" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ListDisplay list = {professorList} type = {type} search = {search} />
        </div>
    )
}

export default ProfessorList