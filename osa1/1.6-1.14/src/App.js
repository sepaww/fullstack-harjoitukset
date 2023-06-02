import { useState } from 'react'

const StatisticLine = (props) => {
  const {text, value} = props
  return (
    
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
     
    
  )
}

const Statistics = (props) => {
  const g = props.good
  const n = props.neutral
  const b = props.bad
  const a = props.all
  if ( a==0){
    return (
      <div>
      No feedback yet
      </div>
    )
  }
  return (
    <>
    <h1>Statistics</h1>
    <table>
    <tbody>
    
    <StatisticLine text="good" value ={g} />
    <StatisticLine text="neutral" value ={n} />
    <StatisticLine text="bad" value ={b} />
    <StatisticLine text="average" value ={(1*g+-1*b)/a} />
    <StatisticLine text="positive" value ={g/a} />
    </tbody>
    </table>
    </>
  )
}
const Button = (props) => {
  const {action, text} = props
  return(
    <button onClick={action}> {text} </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  let all = good+neutral+bad
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  let list=Array(anecdotes.length+1).fill(0);
  console.log(list, "list")
  const [likes, setLike] = useState(list)
  let currid = 0
  let maxIndex = likes.indexOf(Math.max(...likes));

  const handleposClick = () => {
    setGood(good + 1)
  }

  const handleneutClick = () => {
    setNeutral(neutral + 1)
  }
  const handlenegClick = () => {
    setBad(bad + 1)
  }

  const handleanecClick = () => {
    var min = 0;
    var max = anecdotes.length-1;
    var rand =Math.floor(Math.random()* (max-min +1));
    currid=rand
    console.log(rand, currid, "currid")
    setSelected(selected*0 + rand)
  }

  const handlelikeClick = () => {
    let updated = [...likes]
    console.log(updated, currid)
    updated[selected] +=1
    console.log(updated, "after")
    maxIndex = updated.indexOf(Math.max(...updated));
    console.log("now max is", maxIndex)
    setLike(updated)
  }
  const Topofthemorning = (props) => {
    const {maxIndex, anecdotes} = props
    console.log(maxIndex, "maxid")
    return (
    <>
    <br></br>
    
    {anecdotes[maxIndex]}
    <br></br>
    has {likes[maxIndex]} votes
    </>
    )
  }
  return (
    <>
    <div>
      <h1>
        Give feedback:
      </h1>
      <Button action={() => handleposClick()} text="pos" />
      <Button action={handleneutClick}text="neutraali"/>
      <Button action={handlenegClick} text="bad" />
      <br></br>
      <br></br>
      
    </div>
    
    <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    <br></br>
    <h1>Anecdotes</h1>
    <br></br>
    {anecdotes[selected]}
    <br></br>
    has {likes[selected]} votes
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Button action={handlelikeClick} text="like" />
    <Button action={handleanecClick} text="next anecdote pls" />

    <h1>Anecdote with most votes</h1>
    <Topofthemorning maxIndex={maxIndex} anecdotes={anecdotes} />
    </>
  )
}

export default App