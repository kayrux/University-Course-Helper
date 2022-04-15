import { useState } from "react"
import Axios from "axios"

const EditAccount = () => {
    const [newPassword, setNewPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)

    // When user submits username and password make sure they exist
    const onSubmit = async (e) => {
        e.preventDefault()

        if(!newUsername) {
            alert("Please enter a username")
            return
        }

        if (!newPassword) {
            alert("Please enter a password")
            return
        }

        // Attempt to edit account using inputted new username and new password
        try {
            // Check if username in database
            // const usernameAlreadyDefined = await Axios.get(`http://localhost:3001/api/user/${newUsername}`)
            // const data = await usernameAlreadyDefined.data

            // if (data) {
            //     setSuccess(false)
            //     setFailure(true)
            // } else {
            //     // If username is not already defined, Edit Account
            //     Axios.put(`http://localhost:3001/api/user/${localStorage.getItem("user")}`, {newUsername, newPassword})
            //     localStorage.setItem("user", newUsername) // Update username in local storage
            //     setSuccess(true)
            //     setFailure(false)
            // }
            Axios.put(`http://localhost:3001/api/user/${localStorage.getItem("user")}`, {newUsername, newPassword})
            
            setSuccess(true)
            setFailure(false)
            
        } catch (err) {
            if (err.response?.status === 500) {
                console.log("500 ERROR")
            }
            console.log("ASDKASJBD")
            console.log(err)
            setSuccess(false)
            setFailure(true)
        }
        
        if (success) localStorage.setItem("user", newUsername) // Update username in local storage
        
        // Clear input fields
        setNewUsername("")
        setNewPassword("")
    }

    return (
        // Form to retrieve inputed username and password from user
        <form className="login-form" onSubmit={onSubmit}>
            <h1>Edit Account</h1>
            {success && <p>Account Updated</p>}
            {failure && <p className="err">Username already taken</p>}
            <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) =>
                    setNewUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                    setNewPassword(e.target.value)}
            />
            <input type="submit" value="Update" className="btn btn-block" />
        </form>
    )
}

export default EditAccount