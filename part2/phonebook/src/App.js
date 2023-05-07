import { useState, useEffect } from 'react'
import axios from 'axios'

const List = ({persons, newSearch}) => {
  return(persons.filter(person=>person.name.toLowerCase().includes(newSearch.toLowerCase())).map((person) => <li key={person.name}>{person.name} {person.number}</li>))
}

const PersonForm = ({addNewName, newName, newPhone, handleNameChange, handlePhoneChange}) => {
  return(
    <form onSubmit={addNewName}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = ({newSearch, handleSearchChange}) => <div><p>filter shown with <input value={newSearch} onChange={handleSearchChange}/></p></div>

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone
    }
    if(persons.find((person) => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addNewName={addNewName} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <ul>
        <List persons={persons} newSearch={newSearch}/>
      </ul>
    </div>
  )
}

export default App