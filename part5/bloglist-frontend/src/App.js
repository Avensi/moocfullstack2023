import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()

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
      setBlogs(blogs.sort((a,b) => (b.likes - a.likes)))
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async(loginObject) => {
  try {
    const user = await loginService.login(loginObject)
    console.log(user)
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    
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

  
  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage('Unauthorized user')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async(blogObjectId, blogObject) => {
    try {
      const response = await blogService.put(blogObjectId, blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogObjectId ? blog :response).sort((a,b) => (b.likes - a.likes)))
    } catch (exception) {
      setErrorMessage('token invalid')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async(blogObjectId) => {
    try {
      await blogService.remove(blogObjectId)
      setBlogs(blogs.filter(blog => blog.id !== blogObjectId))
    } catch (exception) {
      setErrorMessage('token invalid or unauthorized access')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null){
    return (
      <div> 
      <Notification message={errorMessage} style={errorMessageStyle} />
      <Login handleLogin={handleLogin}/>
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
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Toggable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App