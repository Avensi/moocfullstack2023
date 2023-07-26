import { useState } from 'react'

const Blog = ({blog, user}) => {

  const [showBlog, setShowBlog] = useState(false)

  const toggleBlogVisiblity = () => {
    setShowBlog(!showBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showBlog) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
         <button onClick={toggleBlogVisiblity}>hide</button><br></br> 
        {blog.url}<br></br> 
        likes : {blog.likes} <button>like</button><br></br> 
        {user.name}
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