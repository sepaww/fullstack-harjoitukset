const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = () => {
    return (<h1>{course}</h1>)
  }
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  const Content = () => {
    return (
      <div>
      <Part part={part1}/>
      <Part part={part2}/>
      <Part part={part3}/>
      </div>  
    )
  }
  const Total = () => {
    return (
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    )
  }
  return (
    <div>
      <Header />
      <Content />
      <Total />

    </div>
  )
}
export default App