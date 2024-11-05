
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Robert Ludlum', number: '050-05050505' },
    { name: 'Wile E. Coyote', number: '555-34-BeebBeeb' },
    { name: 'Karaoke Maestro', number: '045-SingALong' },
    { name: 'Scott Mariner', number: '555-Bujah' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const name = {
      name: newName,
      number: newNumber
    }
    const namesInBook = persons.map(person => person.name)
    if (!(namesInBook.includes(newName))) {
      setPersons(persons.concat(name))           
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const namesToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      filter shown with 
        <input 
          value={filterText} 
          onChange={handleFilterChange} 
        />
      </div><br />
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
        {namesToShow.map(person => 
          <p key={person.name}>{ person.name } {person.number}</p>
        )}
      </ul>
      
    </div>
  )

}

export default App
