import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const successMessageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorMessageStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleUsername = (event) => {
    event.preventDefault()
    setUsername(event.target.value)

  }
  const handlePassword = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const handleLogin = async(event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    setUsername('')
    setPassword('')
    setSuccessMessage(`${user.name} successfully logged in!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
  } catch (exception) {
    setErrorMessage('Wrong username or password')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }

  const handleLogout = (event) => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const handleTitle = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({title, author, url})
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(response))
      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Unauthorized user')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null){
    return (
      <div>
      <Notification message={errorMessage} style={errorMessageStyle} />
      <Login username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} handleLogin={handleLogin}/>
      
    </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} style={errorMessageStyle} />
      <Notification message={successMessage} style={successMessageStyle} />
      <p>{user.name} logged in </p>
      <button type="submit" onClick={handleLogout}>logout</button>
      <BlogForm addBlog={addBlog} title={title} author={author} url={url} handleTitle={handleTitle} handleAuthor={handleAuthor} handleUrl={handleUrl} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App