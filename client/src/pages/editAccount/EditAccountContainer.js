import { useState } from "react"

const EditAccountContainer = ({ account_id }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if(!username) {
            alert("Please enter a username")
            return
        }

        if (!password) {
            alert("Please enter a password")
            return
        }
        // Should be updating the database somewhere
        setUsername("")
        setPassword("")
    }

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <h1>Edit Account</h1>
            <input
                type="text"
                placeholder="New Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)}
            />

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