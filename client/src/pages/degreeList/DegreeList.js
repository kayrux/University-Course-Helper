import { useState, useEffect } from "react"
import Axios from "axios"
import ListDisplay from '../../components/ListDiplay';

const DegreeList = () => {

    //This is the list of fauculties to be displayed
    const [degreeList, setDegreeList] = useState([])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "degree"

    //Updates the list of degrees
    useEffect(() => {
        const getDegrees = async () => {
            const Degrees = await Axios.get("http://localhost:3001/api/degreeList")
            const data = await Degrees.data
            setDegreeList(data)
        }
        getDegrees()
    }, [])

    //Call Listdisplay to render the list
    return(
        <div>
            <ListDisplay list = {degreeList} type = {type} />
        </div>
    )
}

export default DegreeList