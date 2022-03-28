import { useState } from "react"

const LoginContainer = ({onLogin}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loggedIn, setLoggedIn] = useState(false);

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
        // TO DO:
            // Try to login
        // Upon successful login:
        onLogin({username, password}) // To do
        setUsername("")
        setPassword("")
        setLoggedIn(true)
        
    }

    return (
        <>
            {loggedIn ? (
                <h2>Welcome</h2>
            ) : (
            <form className="login-form" onSubmit={onSubmit}>
                <h1>Sign in</h1>
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