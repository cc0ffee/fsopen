import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const nameMatch = (person1, person2) => person1.toLowerCase() === person2.toLowerCase()
    const nameObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1 
    }
    
    personService.create(nameObject).then(returnedName => setPersons(persons.concat(returnedName)))
    setNewName('')
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name}`))
      personService.vanish(id)
      setPersons(persons.filter((person)=>person.id!==id))
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
        <List persons={persons} newSearch={newSearch} handleDelete={handleDelete}/>
      </ul>
    </div>
  )
}

export default App