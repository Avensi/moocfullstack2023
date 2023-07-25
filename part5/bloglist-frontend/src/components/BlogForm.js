const BlogForm = ({addBlog, title,author,url, handleTitle, handleAuthor, handleUrl}) => (
    <>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
    <div>
      title
        <input
        type="text"
        value={title}
        name="title"
        onChange={handleTitle}
      />
    </div>
    <div>
      author
        <input
        type="text"
        value={author}
        name="Username"
        onChange={handleAuthor}
      />
    </div>
    <div>
      url
        <input
        type="text"
        value={url}
        name="url"
        onChange={handleUrl}
      />
    </div>
      <button type="submit">create</button>
    </form>  
    </>
)
    

export default BlogForm