import { useMutation, useQueryClient } from 'react-query'
import { createAnecdotes } from '../requests'
import { useNotificationDispatch } from '../notificationContext'
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      dispatch({ type: 'PUT', payload: newAnecdote.content })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () =>{
      dispatch({ type: 'PUT', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ votes: 0, content: content })
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
