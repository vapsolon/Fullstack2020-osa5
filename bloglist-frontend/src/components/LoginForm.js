import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) =>{
    return(
        <form onSubmit={handleSubmit}>
            <div>
                username <input id="Username" type="text" value={username} name="Username" onChange={handleUsernameChange} />
            </div>
            <div>
                password <input id="Password" type="password" value={password} name="Password" onChange={handlePasswordChange} />
            </div>
            <button id="Login" type="submit">Login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm