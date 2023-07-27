import { useState } from 'react'

const Blog = ({blog, user, addLike, deleteBlog}) => {

  const [showBlog, setShowBlog] = useState(false)

  const toggleBlogVisiblity = () => {
    setShowBlog(!showBlog)
  }

  const showDelete = blog.user.id === user.id ? true : false

  console.log(user)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const putLike = (event) => {
    event.preventDefault()
    const blogObject = {
      user : user.id,
      likes : blog.likes + 1,
      author : blog.author,
      title : blog.title,
      url : blog.url
    }
    addLike(blog.id, blogObject)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.tite} by ${blog.author}`)){
      deleteBlog(blog.id)
    }
   

  }

  if (showBlog) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
         <button onClick={toggleBlogVisiblity}>hide</button><br></br> 
        {blog.url}<br></br> 
        likes : {blog.likes} <button onClick={putLike}>like</button><br></br> 
        {blog.user.name} <br></br>
        {showDelete && <button onClick={removeBlog}>remove</button>}
      </div>  
    )
  } 
  else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleBlogVisiblity}>view</button>
      </div>  
    )

  }
 
}


export default Blog