import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Stats = (props) => {
  return (
    <p>{props.feedbackName} {props.feedbackCount}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  
  const addNeutral = () => setNeutral(neutral + 1)

  const addBad = () => setBad(bad + 1)


  return (
    <div>
      <Header name={"give feedback"} />
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>

      <Header name={"statistics"} />
      <Stats feedbackName="good" feedbackCount={good} />
      <Stats feedbackName="neutral" feedbackCount={neutral} />
      <Stats feedbackName="bad" feedbackCount={bad} />
      
    </div>
  )
}

export default App