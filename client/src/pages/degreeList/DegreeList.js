import { useState, useEffect } from "react"
import Axios from "axios"
import ListDisplay from '../../components/ListDiplay';

const DegreeList = () => {

    //This is the list of fauculties to be displayed
    const [degreeListMajor, setDegreeListMajor] = useState([])
    const [degreeListMinor, setDegreeListMinor] = useState([])
    const [degreeListOther, setDegreeListOther] = useState([])
    const [search, setSearch] = useState([])

    //This is used to tell ListDisplay which page to render the list (one of /,/professors,/faculties,/reports)
    const type = "degree"

    //Updates the list of degrees, storing types major, minor and other seperatly
    useEffect(() => {
        const getDegreesMajor = async () => {
            const DegreesMajor = await Axios.get("http://localhost:3001/api/degreeList/major")
            const data = await DegreesMajor.data
            setDegreeListMajor(data)
        }
        getDegreesMajor()
    }, [])

        
    useEffect(() => {
        const getDegreesMinor = async () => {
            const DegreesMinor = await Axios.get("http://localhost:3001/api/degreeList/minor")
            const data = await DegreesMinor.data
            setDegreeListMinor(data)
        }
        getDegreesMinor()
    }, [])

    useEffect(() => {
        const getDegreesOther = async () => {
            const DegreesOther = await Axios.get("http://localhost:3001/api/degreeList/other")
            const data = await DegreesOther.data
            setDegreeListOther(data)
        }
        getDegreesOther()
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
            <h1>
                Majors
            </h1>
            <div>
                <ListDisplay list = {degreeListMajor} type = {type} search = {search} />
            </div>
            <h1>
                Minors
            </h1>
            <div>
                <ListDisplay list = {degreeListMinor} type = {type} search = {search} />
            </div>
            <h1>
                Other
            </h1>
            <div>
                <ListDisplay list = {degreeListOther} type = {type} search = {search} />
            </div>
        </div>
    )
}

export default DegreeList