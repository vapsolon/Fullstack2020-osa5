import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Blog from './Blog'

test('Renders title and author but not url and likes', () =>{
    const blog ={
        title: "Test Blog",
        author: "Test Author",
        url: "test.url",
        likes: 172
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Test Blog: By Test Author'
    )
    expect(component.container).not.toHaveTextContent(
        'test.url'
    )
    expect(component.container).not.toHaveTextContent(
        '172'
    )
})