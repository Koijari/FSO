
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '050-05050505' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const name = {
      name: newName,
      number: newNumber
    }
    const namesInBook = persons.map(person => person.name)
    //console.log(namesInBook, newName)
    if (!(namesInBook.includes(newName))) {
      setPersons(persons.concat(name))           
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleName}
          /><br />
          number: <input
            value={newNumber}
            onChange={handleNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <p key={person.name}>{ person.name } {person.number}</p>
        )}
      </ul>
      
    </div>
  )

}

export default App
