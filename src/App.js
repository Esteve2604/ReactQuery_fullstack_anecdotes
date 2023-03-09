import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, changeVotes } from './requests'
import { useNotificationDispatch } from './notificationContext'

const App = () => {

  const queryClient =  useQueryClient()
  const dispatch=useNotificationDispatch()
  const voteMutation=useMutation(changeVotes, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      dispatch({type: 'PUT', payload: updatedAnecdote.content})
      setTimeout(()=> dispatch({type: 'CLEAR'}), 5000)
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id ===updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })
  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }
  
  const result = useQuery('anecdotes', getAnecdotes)


  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const anecdotes = result.data
  if (!anecdotes) {
    return <div>anecdote service not available due to problems in server</div>
  }
  return (
    <div>
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
    </div>
  )
}

export default App
