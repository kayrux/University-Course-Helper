import { useState } from "react"

// onLogin is called when the user succesfully logs in
const LoginContainer = ({onLogin}) => {
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
        // TO DO:
            // Try to login
        // Upon successful login:
        onLogin({username, password}) // To do
        setUsername("")
        setPassword("")        
    }

    return (
        <>
            {/* removed the conditional (and variables relating to it) to deal with user being logged in that was here because made it so this chunk of code is only acessable if not logged in (via app.js)*/}
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
            </form>
        </>
    )
}

export default LoginContainer