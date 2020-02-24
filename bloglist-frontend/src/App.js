import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () =>{
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const blogRef = React.createRef()

    useEffect(() =>{
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() =>{
        const loggedInUser = window.localStorage.getItem('loggedInUser')
        if(loggedInUser){
            const user = JSON.parse(loggedInUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) =>{
        event.preventDefault()
        try{
            const user = await loginService.login({
                username, password,
            })

            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
        }catch (exception){
            console.log(exception)
            setErrorMessage('Incorrect username or password')
            setTimeout(() =>{
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = (event) =>{
        event.preventDefault()
        setUser(null)
        setUsername('')
        setPassword('')
        window.localStorage.removeItem('loggedInUser')
    }

    const handleNewBlog = async (newBlog) =>{
        blogRef.current.toggleVisibility()
        const added = await blogService.create(newBlog)
        setBlogs(blogs.concat(added))
    }

    const blogForm = () =>(
        <Togglable buttonLabel='Create' ref={blogRef}>
            <BlogForm createBlog={handleNewBlog}/>
        </Togglable>
    )

    const loginForm = () =>(
        <Togglable buttonLabel='Login'>
            <Notification message={errorMessage}/>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({target}) =>setUsername(target.value)}
                handlePasswordChange={({target}) =>setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    const blogList = () =>(
        <div>
            <form onSubmit={handleLogout}>
                {user.name} logged in <button type="submit">Logout</button>
            </form>
            <br />
            <Notification message={errorMessage}/>
            <br />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

    if(user === null){
        return(
            <div>
                <h2>Blogs</h2>
                {loginForm()}
            </div>
        )
    }else{
        return(
            <div>
                <h2>Blogs</h2>
                {blogForm()}
                {blogList()}
            </div>
        )
    }
}

export default App