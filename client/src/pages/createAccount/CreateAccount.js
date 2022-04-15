import { useState } from "react"
import Axios from "axios"

const CreateAccount = () => {
    const [Password, setPassword] = useState("")
    const [Username, setUsername] = useState("")
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)

    // When user submits username and password make sure they exist
    const onSubmit = async (e) => {
        e.preventDefault()

        if(!Username) {
            alert("Please enter a username")
            return
        }

        if (!Password) {
            alert("Please enter a password")
            return
        }

        // Attempt to create account using entered username and password
        try {
            // Check if username in database
            const usernameAlreadyDefined = await Axios.get(`http://localhost:3001/api/user/${Username}`)
            const data = await usernameAlreadyDefined.data

            if (data) {
                setSuccess(false)
                setFailure(true)
            } else {
                // If username is not already defined, create a new account
                Axios.post(`http://localhost:3001/api/user/`, {
                    username : Username,
                    password : Password
                })
                setSuccess(true)
                setFailure(false)
            }
        } catch (err) {
            setSuccess(false)
            setFailure(true)
        }
        
        // Clear input fields
        setUsername("")
        setPassword("")
    }

    return (
        // Form to retrieve inputed username and password from user
        <form className="login-form" onSubmit={onSubmit}>
            <h1>Create Account</h1>
            <div>
                Being able to freely create an admin account is for demo purposes
            </div>
            {success && <p>Account created</p>}
            {failure && <p className="err">Username already taken</p>}
            <input
                type="text"
                placeholder="Username"
                value={Username}
                onChange={(e) =>
                    setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) =>
                    setPassword(e.target.value)}
            />
            <input type="submit" value="Create" className="btn btn-block" />
        </form>
    )
}

export default CreateAccount