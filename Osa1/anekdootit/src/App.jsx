
import { useState } from 'react'

const Button = (props) => {
  //console.log(props)
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const listLength = anecdotes.length
  const headline = 'Anecdote of the day'
  const peoplesChoice = 'Anectode with most votes'
  const voteArray = new Array(listLength).fill(0)
  
  const [votes, setVotes] = useState(voteArray)
  const [selected, setSelected] = useState(0)

  //console.log(votes)
  const maxVotes = Math.max(...votes)
  const mostVotedInd = votes.indexOf(maxVotes)

  const voteUp = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    //console.log(copy, votes)
  }

  const setToValue = () => {
    let newRandomValue 
    do {
      newRandomValue = Math.floor(Math.random()*listLength)
      //console.log('before', newRandomValue)
    } while (newRandomValue === selected) {
      //console.log('after', newRandomValue)
      setSelected(newRandomValue)
  }
}

  return (
    <div>
      <h1>{headline}</h1><br />
      {anecdotes[selected]}<br />
      <div>has { votes[selected] } votes</div>
      <Button handleClick={ voteUp } text='vote' />
      <Button handleClick={ setToValue } text="next anecdote" /><br />
      <h3>{peoplesChoice}</h3>
      {anecdotes[mostVotedInd]}<br />
      <div>has {maxVotes} votes</div>
    </div>
  )
}

export default App
