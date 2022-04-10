import { useState } from "react"
import Axios from "axios"

const EditAccountContainer = ({ username }) => {
    const [newPassword, setNewPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [success, setSuccess] = useState(false)

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

        // Update database
        try {
            Axios.put(`http://localhost:3001/api/user/${username}`, {newUsername, newPassword})
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
        <form className="login-form" onSubmit={onSubmit}>
            <h1>Edit Account</h1>
            {success && <p>Password updated</p>}
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

export default EditAccountContainer