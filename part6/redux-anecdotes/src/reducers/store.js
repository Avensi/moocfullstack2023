import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote, setAnecdotes } from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
const store = configureStore({
    reducer : {
      anecdotes : anecdoteReducer,
      filter : filterReducer,
      notification : notificationReducer
      
    }
  })
  
store.subscribe(()=>{console.log(store.getState())}) 

export default store