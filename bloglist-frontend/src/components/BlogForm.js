import React, {useState} from 'react'

const BlogForm = ({createBlog}) =>{
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) =>{
        setTitle(event.target.value)
    }
    const handleAuthorChange = (event) =>{
        setAuthor(event.target.value)
    }
    const handleUrlChange = (event) =>{
        setUrl(event.target.value)
    }

    const addBlog = (event) =>{
        event.preventDefault()
        createBlog({
            title,
            author,
            url,
            likes: 0,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <form className="blogForm" onSubmit={addBlog}>
            <h2>Create New</h2>
            <div>
                Title <input className="titleInput" type="text" value={title} name="Title" onChange={handleTitleChange} />
            </div>
            <div>
                Author <input className="authorInput" type="text" value={author} name="Author" onChange={handleAuthorChange} />
            </div>
            <div>
                URL <input className="urlInput" type="text" value={url} name="URL" onChange={handleUrlChange} />
            </div>
            <button id="blogButton" type="submit">Submit</button>
        </form>
    )
}

export default BlogForm