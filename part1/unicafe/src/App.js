import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Stats = (props) => {
  return (
    <p>{props.name} {props.counter} {props.text}</p>
  )
}

const Statistics = (props) => {
  return (
    <>
      <Stats name="good" counter={props.good} text=""/>
      <Stats name="neutral" counter={props.neutral} text=""/>
      <Stats name="bad" counter={props.bad} text=""/>
      <Stats name="all" counter={props.total} text=""/>
      <Stats name="average" counter={props.average} text=""/>
      <Stats name="positive" counter={props.positive} text="%"/>
    </>

  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}> {props.text} </button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedCount, setFeedCount] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const addGood = () => {
    const updatedGood = good + 1 
    setGood(updatedGood)

    const updatedFeedCount = feedCount + 1 
    setFeedCount(updatedFeedCount)

    setTotal(updatedGood + neutral + bad)
    setAverage(updatedFeedCount/(updatedGood + neutral + bad))
    setPositive(updatedGood / (updatedGood + neutral + bad) * 100)

  }
  const addNeutral = () => {
    const updatedNeutral = neutral + 1 
    setNeutral(updatedNeutral)
    
    const updatedFeedCount = feedCount + 0 
    setFeedCount(updatedFeedCount)

    setTotal(updatedNeutral + good + bad)

    setAverage(updatedFeedCount/(updatedNeutral + good + bad))
    setPositive((good / (updatedNeutral + good + bad)) * 100)
  }
  const addBad = () => {
    const updatedBad = bad + 1 
    setBad(updatedBad)
    
    const updatedFeedCount = feedCount - 1
    setFeedCount(updatedFeedCount)

    setTotal(updatedBad + neutral + good)
    setAverage(updatedFeedCount/(updatedBad + neutral + good))
    setPositive((good / (updatedBad + neutral + good)) * 100)
  }

  return (
    <div>
      <Header name={"give feedback"} />
      <Button handleClick={addGood} text="good"/>
      <Button handleClick={addNeutral} text="neutral"/>
      <Button handleClick={addBad} text="bad"/>

      <Header name={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} average={average} all={total} positive={positive} />

      
    </div>
  )
}

export default App