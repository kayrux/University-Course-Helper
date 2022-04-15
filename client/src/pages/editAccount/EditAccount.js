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
        <div className="accountAlign">
            {/* Form to retrieve inputed username and password from user */}
            <form className="account" onSubmit={onSubmit}>
                    <h1 className="accountText">
                        Edit Account
                    </h1>
                {success && <p className="accountText"> Account Updated</p>}
                <input
                    className = "accountInput"
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) =>
                        setNewUsername(e.target.value)}
                />
                <input
                    className = "accountInput"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(e.target.value)}
                />
                <div className="accountButtonAlign">
                    <input type="submit" value="Edit" className="accountButton" />
                </div>
            </form>
        </div>
    )
}

export default EditAccount