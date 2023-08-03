import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote, setAnecdotes } from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import anecdotesService from '../services/anecdotes'
const store = configureStore({
    reducer : {
      anecdotes : anecdoteReducer,
      filter : filterReducer,
      notification : notificationReducer
      
    }
  })
  
anecdotesService.getAll().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))
store.subscribe(()=>{console.log(store.getState())}) 

export default store