

const dummy = (blogs) => {
    return 1
  }
  
  const totallikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    return blogs.reduce((prev, current) => 
       prev.likes > current.likes ? prev : current
    )
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
    const Counts = {}
    blogs.forEach((blog) => {
      if (blog.author in Counts) {
        Counts[blog.author]++
      } else {
        Counts[blog.author] = 1
      }
    })
    let mostAuthor = ''
    let max = 0;
    for (const author in Counts) {
      if (Counts[author] > max) {
        mostAuthor = author
        max = Counts[author]
      }
    }
    return {
      author: mostAuthor,
      blogs: max,
    }
  }

  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
    const Counts = {}
    blogs.forEach((blog) => {
      if (blog.author in Counts) {
        Counts[blog.author]+=blog.likes
      } else {
        Counts[blog.author] = blog.likes
      }
    })
    let mostAuthor = ''
    let max = 0;
    for (const author in Counts) {
      if (Counts[author] > max) {
        mostAuthor = author
        max = Counts[author]
      }
    }
    return {
      author: mostAuthor,
      likes: max,
    }
  }

  module.exports = {
    dummy,
    totallikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }