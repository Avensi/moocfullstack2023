import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }
  if (user === null){
    return (
      <div>
      <Login username={username} password={password} handleUsername={handleUsername} handlePassword={handlePassword} handleLogin={handleLogin}/>
      <Notification message={errorMessage} style={errorMessageStyle} />
    </div>
    )
  }
  return (
    <div>
  
      <h2>blogs</h2>
      <p>{user.name} logged in </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App