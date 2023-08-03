import {useSelector, useDispatch } from 'react-redux'
import {putVote} from '../reducers/anecdoteReducer'
import { hideNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().includes(state.filter.toLocaleLowerCase())).sort((a,b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (id, content, votes) => {
  
        dispatch(putVote(id, content, votes))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(() => {
          dispatch(hideNotification())
      }, 5000)
    }

    return (
        <>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>)}
        </>
    )
}

export default AnecdoteList