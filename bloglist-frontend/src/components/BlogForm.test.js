import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () =>{
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('.titleInput')
    const authorInput = component.container.querySelector('.authorInput')
    const urlInput = component.container.querySelector('.urlInput')
    const blogForm = component.container.querySelector('.blogForm')

    fireEvent.change(titleInput, { 
        target: {value: 'testtitle'} 
    })
    fireEvent.change(authorInput, { 
        target: {value: 'testauthor'} 
    })
    fireEvent.change(urlInput, { 
        target: {value: 'testurl'} 
    })
    fireEvent.submit(blogForm)

    expect(createBlog.mock.calls.length).toBe(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testtitle')
    expect(createBlog.mock.calls[0][0].author).toBe('testauthor')
    expect(createBlog.mock.calls[0][0].url).toBe('testurl')
})