import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Blogform from "./components/BlogForm"
import Togglable from "./components/Toggleable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      console.log("loggedinjson")
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage("succesfully added a new blog")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }



  //const blogsToShow = showAll ? blogs : blogs.filter((blog) => blog)

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const logoutform = () => (
    <form onSubmit={logout}>
      <div></div>
      <button type="submit">logout</button>
    </form>
  )

  const likeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    blog.likes++
    const updatedblog = await blogService.update(id, blog)
    setBlogs(
      blogs.map((blog) =>
        blog.id !== id ? blog : { ...updatedblog, user: blog.user }
      )
    )
  }

  const deleteBlog = async (id) => {
    //const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove?`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={errorMessage} />

        {!user && loginForm()}
        {user && (
          <div>
            <p>{user.name} logged in</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>Blogs</h1>
        <Notification message={errorMessage} />

        {!user && loginForm()}
        {user && (
          <div>
            <p>{user.name} logged in</p>
            {logoutform()}
            <br></br>
            <Togglable buttonLabel="create a blog">
              <Blogform
                createBlog={addBlog}
              />
            </Togglable>
          </div>
        )}

        <ul>
          <ul>
            {blogs
              .sort((prev, curr) => curr.likes - prev.likes)
              .map((blog) => (
                <Blog
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
                />
              ))}
          </ul>
        </ul>
      </div>
    </div>
  )
}

export default App

/*<div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} title={blog.title} author={blog.author} url={blog.url} />
      )}
    </div>*/
