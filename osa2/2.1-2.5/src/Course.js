const Header = ({ name }) => {
    
    return (<h1>{name}</h1>)
  }
  const Part = ({ part }) => {
    
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part part={part} />
        ))}
      </div>  
    )
  }
  const Total = ({ total }) => {
    return (
      <p> <strong> Total {total} </strong> </p>
    )
  }
  const Course = ({ course }) => {
    const parts = course.parts
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
    <>
    <Header name={course.name}/>
    <Content parts={parts}/>
    <Total total = {total}/>
    </>
    )
  }
  
  export default Course
