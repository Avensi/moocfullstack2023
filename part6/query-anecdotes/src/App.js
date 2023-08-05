import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useReducer } from 'react'
import NotificationContext from './components/NotificationContext'

const notificationReducer = (state, action)=> {
  switch(action.type) {
    case "SET" : 
      return action.payload
    case "REMOVE":
      return ''
    default : 
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer,'')
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')}
    })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes : anecdote.votes + 1})
    notificationDispatch({type:"SET", payload : `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      notificationDispatch({type:"REMOVE"})
    }, 5000)
  }

  const result = useQuery('anecdotes',getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false
  })
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  } 
  else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data
  

  return (
    <div>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </NotificationContext.Provider>
    </div>
  )
}

export default App
