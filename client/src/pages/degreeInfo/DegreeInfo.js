import React from 'react'
import { useLocation } from "react-router"
import { useState, useEffect } from "react"
import Axios from "axios"
import { Link } from "react-router-dom";

const DegreeInfo = () => {

    // Read the URL for the course name
    const location = useLocation()
    const name = decodeURI(location.pathname.split("/")[2]);

    // Setup state hooks to store data gotten from api calls
    const [degreeInfo, setDegreeInfo] = useState([])
    const [requiredCourseInfo, setRequiredCourseInfo] = useState([])
    const [optionalCourseInfo, setOptionalCourseInfo] = useState([])

    // Call apis (for more info on what each does look at client > index.js)
    useEffect(() => {
        const getDegrees = async () => {
            const degrees = await Axios.get(`http://localhost:3001/api/degreeInfo/${name}`)
            const data = await degrees.data
            setDegreeInfo(data)
        }
        getDegrees()
    }, [])

    useEffect(() => {
        const getRequiredCourses = async () => {
            const requiredCourses = await Axios.get(`http://localhost:3001/api/degreeInfo/${name}/coursesRequired`)
            const data = await requiredCourses.data
            setRequiredCourseInfo(data)
        }
        getRequiredCourses()
    }, [])

    useEffect(() => {
        const getOptionalCourses = async () => {
            const optionalCourses = await Axios.get(`http://localhost:3001/api/degreeInfo/${name}/coursesOptional`)
            const data = await optionalCourses.data
            setOptionalCourseInfo(data)
        }
        getOptionalCourses()
    }, [])

    // Print out course info
    return (
        <div>
            {degreeInfo.map((degree) => {
                return(
                    <div>
                        <h1>
                            {degree.Degree_name}
                        </h1> 
                        <div>
                            <a target="_blank" href={degree.Degree_link} > Detailed degree information</a>
                        </div>
                        <h2>
                            Required courses
                        </h2>
                        {requiredCourseInfo.map((course) => {
                            return(
                                <div>
                                    <Link to={`/courses/${course.Course_name}`}>{course.Course_name}</Link>
                                </div>
                            );
                        })}
                        <h2>
                            Optional courses
                        </h2>
                        {optionalCourseInfo.map((course) => {
                            return(
                                <div>
                                    <Link to={`/courses/${course.Course_name}`}>{course.Course_name}</Link>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}

export default DegreeInfo


