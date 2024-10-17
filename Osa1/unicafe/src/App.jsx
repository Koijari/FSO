import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    
  )
}

const Button = (props) => {
  //console.log(props)
  return (
  <>
    <button onClick={ () => props.func(props.feedback+1)}>
    {props.text}
    </button>
  </>
  )
}

const Statistics = (props) => {
  const average = ((props.good-props.bad)/(props.good+props.neutral+props.bad)).toFixed(3)
  const positive = ((props.good/(props.good+props.neutral+props.bad))*100).toFixed(1)+'%'
  const all = (props.good+props.neutral+props.bad)
  if (!props.good && !props.neutral && !props.bad) {
    return <p>No feedback given</p>
  } else {
  return (    
  <table>
    <tbody> 
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </tbody> 
  </table>
  )}
}

const App = () => {
  const headline = 'Give feedback'
  const stats = 'Statistics'
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //console.log(good, neutral, bad)
  return (
    <div>
      <h1>{headline}</h1>
      <Button text='good' feedback={good} func={setGood}/>
      <Button text='neutral' feedback={neutral} func={setNeutral}/>
      <Button text='bad' feedback={bad} func={setBad}/>
      <h2>{stats}</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>    
  )
}

export default App
