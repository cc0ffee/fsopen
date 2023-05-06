import { useState } from 'react'

const StatisticLine = ({text, value}) => <><td>{text}</td><td>{value}</td></>

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return(
      <table>
        <tbody>
        <tr><StatisticLine text="good" value={good}/></tr>
        <tr><StatisticLine text="neutral" value={neutral}/></tr>
        <tr><StatisticLine text="bad" value={bad}/></tr>
        <tr><StatisticLine text="average" value={(good-bad)/(good+neutral+bad)}/></tr>
        <tr><StatisticLine text="positive" value={((good/(good+neutral+bad))*100) + "%"}/></tr>
        </tbody>
      </table>
  )
}

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Header text="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App