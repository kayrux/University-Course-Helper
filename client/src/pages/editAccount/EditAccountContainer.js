import { useState } from "react"
import Axios from "axios"

const EditAccountContainer = ({ username }) => {
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        // if(!username) {
        //     alert("Please enter a username")
        //     return
        // }

        if (!password) {
            alert("Please enter a password")
            return
        }

        // Update database
        try {
            Axios.put("http://localhost:3001/api/user", {username, password})
            setSuccess(true)
        } catch (err) {
            console.log(err)
            setSuccess(false)
        }
        
        // Should be updating the database somewhere
        //setUsername("")
        setPassword("")
    }

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <h1>Edit Account</h1>
            {/* <input
                type="text"
                placeholder="New Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)}
            /> */}
            {success && <p>Password updated</p>}
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)}
            />

            <input type="submit" value="Update" className="btn btn-block" />
        </form>
    )
}

export default EditAccountContainer