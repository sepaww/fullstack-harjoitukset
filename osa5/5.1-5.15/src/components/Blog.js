
import { useState } from "react"

const Blog = ({
  key,
  id,
  title,
  author,
  url,
  likes,
  liker,
  deleter,
  username,
  user,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  console.log(key)
  const [all, setAll] = useState(false)

  const showHandler = () => {
    setAll(!all)
  }

  return (
    <div style={blogStyle}>
      <p>Title: {title} </p>
      <button onClick={showHandler}>{all ? "close" : "open"}</button>
      {all && (
        <div>
          <p> Author: {author} </p>
          <p> url: {url} </p>
          <p>
            {" "}
            likes: {likes} <button onClick={() => liker(id)}>like</button>{" "}
          </p>
          <p> {username} </p>

          {username === user.username && (
            <button onClick={() => deleter(id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
