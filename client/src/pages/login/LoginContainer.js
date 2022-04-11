import { useState } from "react"
import Axios from "axios"

// onLogin is called when the user succesfully logs in
const LoginContainer = ({onLogin}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false) // Used for wrong username/password
    const [loggedIn, setLoggedIn] = useState(false); // Keeps track of whether the user is logged in

    // Verifies the password
    const verifyPassword = (passwords) => {
        if (passwords[0] === password && passwords[0] !== "") {
            onLogin({username, password})
            
            setLoggedIn(true)
            setLoginError(false)
        } else {
            setLoggedIn(false)
            setLoginError(true)
        }
    }

    // Authenticates username and password
    const onSubmit = async (e) => {
        e.preventDefault()
        
        if(!username) {
            alert("Please enter a username")
            return
        }

        if (!password) {
            alert("Please enter a password")
            return
        }

        // Fetch password from database and store in array
        const passwords = []
        const password1 = await Axios.get(`http://localhost:3001/api/password/${username}`)
        const data = await password1.data
        const requests = data.map(async (pswrd) => {
            passwords.push(pswrd.Password)
        })

        // Make sure database request is complete
        Promise.all(requests).then(() => {
            // Verify password
            verifyPassword(passwords)
            // Reset text fields
            setUsername("")
            setPassword("")
        })    
    }

    return (
        <>
            {loggedIn ? (
                <h2>Welcome</h2>
            ) : (
            <form className="login-form" onSubmit={onSubmit}>
                <h1>Sign in</h1>
                
                {loginError && (<p className="err">Incorrect username or password</p>)}

                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) =>
                        setUsername(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) =>
                        setPassword(e.target.value)}
                />

                <input type="submit" value="Login" className="btn btn-block" />
            </form>)}
        </>
        )
}

export default LoginContainer