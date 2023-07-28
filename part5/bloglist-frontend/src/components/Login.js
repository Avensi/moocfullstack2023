import { useState } from "react"
import PropTypes from "prop-types"

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (event) => {
        event.preventDefault()
        setUsername(event.target.value)

    }
    const handlePassword = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const createLogin = (event) => {
        event.preventDefault()
        handleLogin({ username, password })
        setUsername("")
        setPassword("")
    }


    return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={createLogin}>
                <div>
                username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsername}
                    />
                </div>
                <div>
                password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePassword}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
}

export default Login