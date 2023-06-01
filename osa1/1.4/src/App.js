const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = () => {
    return (<h1>{course}</h1>)
  }
  const Part = ({part}) => {
    return (
      <p>{parts[part].name} {parts[part].exercises}</p>
    )
  }
  const Content = () => {
    return (
      <div>
      <Part part={0}/>
      <Part part={1}/>
      <Part part={2}/>
      </div>  
    )
  }
  const Total = () => {
    return (
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
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