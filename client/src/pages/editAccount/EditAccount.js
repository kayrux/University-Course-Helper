import { useState } from "react"
import Axios from "axios"

const EditAccount = () => {
    const [newPassword, setNewPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [success, setSuccess] = useState(false)

    // When user submits username and password make sure they exist
    const onSubmit = (e) => {
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
            Axios.put(`http://localhost:3001/api/user/${localStorage.getItem("user")}`, {newUsername, newPassword})
            localStorage.setItem("user", newUsername) // Update username in local storage
            setSuccess(true)
        } catch (err) {
            console.log(err)
            setSuccess(false)
        }
        
        // Clear input fields
        setNewUsername("")
        setNewPassword("")
    }

    return (
        // Form to retrieve inputed username and password from user
        <form className="login-form" onSubmit={onSubmit}>
            <h1>Edit Account</h1>
            {success && <p>Account Updated</p>}
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