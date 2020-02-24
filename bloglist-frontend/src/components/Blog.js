import React from 'react'
const Blog = ({blog}) =>(
    <div className='blog'>
        {blog.title}: By {blog.author}
    </div>
)

export default Blog