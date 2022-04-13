import { useState } from "react"
import Axios from "axios"

const CreateAccount = () => {
    const [Password, setPassword] = useState("")
    const [Username, setUsername] = useState("")
    const [success, setSuccess] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!Username) {
            alert("Please enter a username")
            return
        }

        if (!Password) {
            alert("Please enter a password")
            return
        }

        // Update database
        try {
            Axios.post(`http://localhost:3001/api/user/`, {
                username : Username,
                password : Password
            })
            setSuccess(true)
        } catch (err) {
            console.log(err)
            setSuccess(false)
        }
        
        // Clear input fields
        setUsername("")
        setPassword("")
    }

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <h1>Create Account</h1>
            <div>
                Being able to freely create an admin account is for demo purposes
            </div>
            {success && <p>Account created</p>}
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