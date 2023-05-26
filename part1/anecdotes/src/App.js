import { useState } from 'react'

const Header = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}> {props.text}</button>
  )
}

const Vote = (props) => {
  return(
    <p>has {props.votes} votes</p>
  )
}

const Anecdote = (props) => {
  return(
    <>
      <Header text={props.text} />
      <p>{props.anecdotes[props.selected]}</p>
      <Vote votes={props.votes[props.selected]} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [mostVote, setMostVote] = useState(0)

  const randomSelect = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    setMostVote(votes.indexOf(Math.max(...votes)))
  }

  const addVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
    setMostVote(updatedVotes.indexOf(Math.max(...updatedVotes)))

  }


  return (
    <div>
      <Anecdote text={"Anecdote of the day"} anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button handleClick={addVote} text={"vote"} />
      <Button handleClick={randomSelect} text={"next anecdote"} />  
      <Anecdote text={"Anecdote with most votes"} anecdotes={anecdotes} selected={mostVote} votes={votes} />
    </div>

    
  )
}

export default App