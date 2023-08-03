import {useSelector, useDispatch } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import Notification from './Notification'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().includes(state.filter.toLocaleLowerCase())).sort((a,b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
    }

    return (
        <>
        <Notification/>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>)}
        </>
    )
}

export default AnecdoteList