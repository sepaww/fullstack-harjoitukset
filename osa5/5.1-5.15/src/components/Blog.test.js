import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders only title and after clicking also renders the rest', async () => {
const user = {
    username: "sepa",
    name: "jami"
    }
  const blog = {
    id: "1",
    title: 'jamin elama',
    author: 'jami',
    url: 'wewewe',
    likes: 0,
    user: {user},
  }


  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()

  render(<Blog 
    key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  author={blog.author}
                  url={blog.url}
                  likes={blog.likes}
                  username={blog.user.username}
                  liker={likeBlog}
                  deleter={deleteBlog}
                  user={user}
                   />)

  const element = screen.getByText('Title: jamin elama')
  
  expect(element).toBeDefined()
  
  const usersim = userEvent.setup()
  const button = screen.getByText('open')
  await usersim.click(button)
  const rendered_url=screen.getByText('url: wewewe')
  const rendered_likes=screen.getByText('likes: 0')
  expect(rendered_url).toBeDefined()
  expect(rendered_likes).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {

    const user = {
        username: "sepa",
        name: "jami"
        }
      const blog = {
        id: "1",
        title: 'jamin elama',
        author: 'jami',
        url: 'wewewe',
        likes: 0,
        user: {user},
      }
      const likeBlog = jest.fn()
      const deleteBlog = jest.fn()
    
      render(<Blog 
        key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      author={blog.author}
                      url={blog.url}
                      likes={blog.likes}
                      username={blog.user.username}
                      liker={likeBlog}
                      deleter={deleteBlog}
                      user={user}
                       />)

  const usersim = userEvent.setup()
  const button = screen.getByText('open')
  await usersim.click(button)
  const likebutton=screen.getByText('like')
  await usersim.click(likebutton)
  await usersim.click(likebutton)
  expect(likeBlog.mock.calls).toHaveLength(2)
})