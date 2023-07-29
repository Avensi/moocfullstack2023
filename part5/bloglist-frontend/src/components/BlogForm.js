import { useState } from "react"

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

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

    const createBlog = (event) => {
        event.preventDefault()
        addBlog({ title, author, url })
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (

        <>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>
            title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleTitle}
                        id="title-input"
                    />
                </div>
                <div>
            author
                    <input
                        type="text"
                        value={author}
                        name="Username"
                        onChange={handleAuthor}
                        id="author-input"
                    />
                </div>
                <div>
            url
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={handleUrl}
                        id="url-input"
                    />
                </div>
                <button id="create-blog-button"type="submit">create</button>
            </form>
        </>
    )
}
export default BlogForm