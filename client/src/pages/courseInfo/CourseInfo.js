import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import Axios from "axios"
import SemesterProf from '../../components/SemesterProf'
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const CourseInfo = ({username}) => {

    // Read the URL for the course name
    const location = useLocation()
    const name = decodeURI(location.pathname.split("/")[2]);
    const date = new Date();

    // Setup state hooks to store data gotten from api calls
    const [courseInfo, setCourseInfo] = useState([])
    const [semesterInfo, setSemesterInfo] = useState([])
    const [degreeRequiredInfo, setDegreeRequiredInfo] = useState([])
    const [degreeOptionalInfo, setDegreeOptionalInfo] = useState([])
    const [score, setScore] = useState("")
    const [comment, setComment] = useState("")
    const [getRatings, setGetRatings] = useState([])
    const [isEditRating, setIsEditRating] = useState("")
    const [ratingIdEdit, setRatingIdEdit] = useState("")
    const [scoreEdit, setScoreEdit] = useState("")
    const [commentEdit, setCommentEdit] = useState("")
    const [isCreateReport, setIsCreateReport] = useState("")
    const [ratingIdReport, setRatingIdReport] = useState("")
    const [reportReason, setReportReason] = useState("")

    // Call get apis (for more info on what each does look at client > index.js)
    useEffect(() => {
        const getCourses = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}`)
            const data = await courses.data
            setCourseInfo(data)
        }
        getCourses()
    }, [name])

    useEffect(() => {
        const getSemester = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}/semester`)
            const data = await courses.data
            setSemesterInfo(data)
        }
        getSemester()
    }, [name])

    useEffect(() => {
        const getDegreeRequired = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}/degreeRequired`)
            const data = await courses.data
            setDegreeRequiredInfo(data)
        }
        getDegreeRequired()
    }, [name])

    useEffect(() => {
        const getDegreeOptional = async () => {
            const courses = await Axios.get(`http://localhost:3001/api/courseInfo/${name}/degreeOptional`)
            const data = await courses.data
            setDegreeOptionalInfo(data)
        }
        getDegreeOptional()
    }, [name])

    useEffect(() => {
        const getRatings = async () => {
            const ratings = await Axios.get(`http://localhost:3001/api/rating/${name}`)
            const data = await ratings.data
            setGetRatings(data)
        }
        getRatings()
    }, [name])

    // Handling submission of new comment
    const createRating = async (e) => {

        //stops prevents the post request and reload if no score selected
        if(!score) {
            e.preventDefault();
            alert("Please select a score")

        }
        else{
            if(!localStorage.getItem("user")){
                try{
                    await Axios.post(`http://localhost:3001/api/rating/${name}`, {
                        score,
                        comment,
                        rating_date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
                        username: null,
                        course_name: name
                    })
                }
                catch(err) {
                }
            }
            else{
                try{
                    await Axios.post(`http://localhost:3001/api/rating/${name}`, {
                        score,
                        comment,
                        rating_date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
                        username: localStorage.getItem("user"),
                        course_name: name
                    })
                }
                catch(err) {
                }
            }
        }
    }

    //used to save the rating id so edit rating knows what to edit
    const SaveRatingIdEdit = (prop) => {
        useEffect(() => {
            setRatingIdEdit(prop.ratingIdEdit)
        })
        return(
            
            <></>
        )
    }


    // Handling submission of new comment
    const editRating = async (e) => {

        //stops prevents the post request and reload if no score selected
        if(!scoreEdit) {
            e.preventDefault();
            alert("Please select a score")
        }
        else{
            try{
                await Axios.put(`http://localhost:3001/api/rating/${ratingIdEdit}`, {
                    username: localStorage.getItem("user"),
                    score: scoreEdit,
                    comment: commentEdit,
                    rating_date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
                })
            }
            catch(err) {
            }
        }
    }

    const deleteRating = async (id) => {
        window.location.reload();
        await Axios.delete(`http://localhost:3001/api/rating/${id}`)
    }

    const SaveRatingIdReport = (prop) => {
        useEffect(() => {
            setRatingIdReport(prop.ratingIdReport)
        })
        return(
            
            <></>
        )
    }

    const createReport = async (e) => {

        //stops prevents the post request and reload if no score selected
        if(!reportReason) {
            e.preventDefault();
            alert("Please select a reason for the report")
        }
        else{
            e.preventDefault();
            try{
                alert("Report Submitted")
                await Axios.post(`http://localhost:3001/api/reportInfo`, {
                    reason: reportReason,
                    report_date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10),
                    rating_id: ratingIdReport,
                })
            }
            catch(err) {
            }
        }
    }

    //Print out course info
    return(
        <div>
            {/*generic course info */}
            {courseInfo.map((course) => {
                return(
                    <div key={course.Course_name} value={course}>
                        <h1>
                            {course.Course_name}
                        </h1>
                        <div>
                            {course.Course_description}
                        </div>
                        <br>
                        </br>
                        <div>
                            - Hours: {course.Hours}
                        </div>
                        <div>
                            - Prerequisites: {' '}
                            {!!(course.Prerequisites)? course.Prerequisites : 'No prerequisites listed'}
                        </div>
                        <div>
                            - Antirequisites: {' '}
                            {!!(course.Antirequisites)? course.Antirequisites : 'No antirequisites listed'}
                        </div>

                        <hr />

                        <h2>
                            Offered in
                        </h2>
                        {/*course info for each semester taught*/}
                        {semesterInfo.map((sem) => {
                            return(
                                <div key={[sem.Sem_start_year, sem.Sem_start_term]} value={sem}>
                                    <h3>
                                        {sem.Sem_start_year} {' '}
                                        {sem.Sem_start_term}
                                    </h3>
                                    <div>
                                        Duration: {sem.Duration} months
                                    </div>
                                    {/* semesterProf returns information on further info on semester (related to prof) as well as prof info*/}
                                    {<SemesterProf name = {course.Course_name} startYear = {sem.Sem_start_year} startTerm = {sem.Sem_start_term} />}
                                </div>
                            );
                        })}

                        <hr />

                        <h2>
                            Degrees relevant to
                        </h2>
                        <h3>
                            Required for:
                        </h3>
                        <div>
                            *note some required courses may not actually be manditory to complete the degree,
                            and instead may be replaced with a different required course to complete the degree
                            check detailed degree information on the corasponding degree page for more details
                        </div>
                        {/*info on how the course related to degrees*/}
                        {degreeRequiredInfo.map((required) => {
                            return(
                                <div key={required.Degree_name} value={required}>
                                    <Link to={`/degrees/${required.Degree_name}`}>{required.Degree_name}</Link>
                                </div>
                            );
                        })}
                        <h3>
                            Optional for:
                        </h3>
                        {degreeOptionalInfo.map((optional) => {
                            return(
                                <div key={optional.Degree_name} value={optional}>
                                    <Link to={`/degrees/${optional.Degree_name}`}>{optional.Degree_name}</Link>
                                </div>
                            );
                        })}
                        <hr />
                        {/*form to submit rating*/}
                        <div>
                            <form className="rating-form" onSubmit={createRating}>

                                <label>
                                    Rate this class: {' '}
                                    <select value={score || ""} onChange={(e) => {setScore(e.target.value || "" )}}>  
                                        <option value = ""> </option>          
                                        <option value = "1"> 1 </option>
                                        <option value = "2"> 2 </option>
                                        <option value = "3"> 3 </option>
                                        <option value = "4"> 4 </option>
                                        <option value = "5"> 5 </option>
                                    </select>
                                </label>
                                <input 
                                    className="comment-input"
                                    type="text" 
                                    maxLength="255"
                                    placeholder="Additional Comments" 
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)}
                                />

                                <input type="submit" value="Add Rating" className="btn btn-block" />
                            </form>
                        </div>

                        <hr />
                        {getRatings.map((rating) => {
                            return(
                                <div key={rating.Rating_id} value={rating}>
                                    {/*list all ratings for the given class*/}                     
                                    <div>
                                        Posted: {' '}
                                        {rating.Rating_date.slice(0, 10)}
                                        {!!(rating.Username)? ` By admin ${rating.Username}` : ''}     
                                    </div>
                                    <div>
                                        {rating.Score}
                                        /5
                                    </div>
                                    <div>
                                        {rating.Comment}
                                    </div>
                                    {isEditRating === rating.Rating_id? ( <div> 
                                        <SaveRatingIdEdit ratingIdEdit = {rating.Rating_id}/>
                                        {/*form for editing ratings when edit button is pressed*/} 
                                        <form className="rating-form" onSubmit={editRating}>  
                                            <label>
                                                New score: {' '}
                                                <select value={scoreEdit || ""} onChange={(e) => {setScoreEdit(e.target.value || "" )}}>  
                                                    <option value = ""> </option>          
                                                    <option value = "1"> 1 </option>
                                                    <option value = "2"> 2 </option>
                                                    <option value = "3"> 3 </option>
                                                    <option value = "4"> 4 </option>
                                                    <option value = "5"> 5 </option>
                                                </select>
                                            </label>

                                            <input 
                                                className="comment-input"
                                                type="text" 
                                                maxLength="255"
                                                placeholder="New Comments" 
                                                value={commentEdit}
                                                onChange={(e) =>
                                                    setCommentEdit(e.target.value)}
                                            />

                                            <input type="submit" value="Edit Rating" className="btn btn-block" />
                                        </form>
                                        <Button text="Cancel" color="#7babe3" onClick={() => setIsEditRating(null)}></Button>
                                    </div> ) : ( <div> 
                                        <div>
                                        {/*THIS WRITTEN WITH BELIEF IS LOGGED IN WILL BE NULL IF NOT LOGGED IN AND WILL BE USERNAME IF LOGGED IN */}
                                        {localStorage.getItem("user") === rating.Username ? <Button text="Edit" color="#7babe3" onClick={() => setIsEditRating(rating.Rating_id)}></Button> : '' }
                                        </div>
                                        <div>
                                        {!localStorage.getItem("user") ? '' : <Button text="Delete" color="#7babe3" onClick={() => deleteRating(rating.Rating_id)}></Button>}
                                        </div>
                                        {isCreateReport === rating.Rating_id? ( <div> 
                                            
                                            <SaveRatingIdReport ratingIdReport = {rating.Rating_id}/>
                                            {/*form for creating reports when report button is pressed*/} 
                                            <form onSubmit={createReport}>  
                                                <label>
                                                    Reason for report: {' '}
                                                    <select value={reportReason || ""} onChange={(e) => {setReportReason(e.target.value || "" )}}>  
                                                        <option value = ""> </option>          
                                                        <option value = "Spam"> Spam </option>
                                                        <option value = "False/Misleading"> False/Misleading </option>
                                                        <option value = "Racism"> Racism </option>
                                                        <option value = "Waluigi?"> Waluigi? </option>
                                                        <option value = "Not able to come up with actually good report reasons"> Not able to come up with actually good report reasons </option>
                                                    </select>
                                                </label>

                                                <input type="submit" value="Submit" />
                                            </form>
                                            <Button text="Cancel" color="#7babe3" onClick={() => setIsCreateReport(null)}></Button>
                                        </div> ):( <div>
                                            <Button text="Report" color="#7babe3" onClick={() => setIsCreateReport(rating.Rating_id)}></Button>
                                        </div>)}
                                    </div>)}  
                                    <br>
                                    </br>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )    
}

export default CourseInfo


