import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import List from './components/List'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newNotification, setNewNotification] = useState(null)

  const addNewName = (event) => {
    event.preventDefault()
    const matchedPerson = persons.find((person) => person.name === newName)
    if(matchedPerson) {
      if(window.confirm(`${matchedPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const nameObject = {name: newName, number: newPhone, id: matchedPerson.id}
        personService.update(matchedPerson.id, nameObject).then(() => {
          setPersons(persons.filter((person)=>person.id!==matchedPerson.id).concat(nameObject))
          setNewNotification(`Updated ${matchedPerson.name}`)
          setTimeout(()=>setNewNotification(null), 5000)}
      )}
      return
    }
    const nameObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1 
    }
    
    personService.create(nameObject).then(returnedName => {
      setPersons(persons.concat(returnedName))
      setNewNotification(`Added ${newName}`)
      setTimeout(()=>setNewNotification(null), 5000)
    })
    setNewName('')
    setNewPhone('')
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name}`))
      personService.vanish(id).then(() => {
        setPersons(persons.filter((person)=>person.id!==id))
        setNewNotification(`Deleted ${name}`)
        setTimeout(()=>setNewNotification(null), 5000)}
      )
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification}/>
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