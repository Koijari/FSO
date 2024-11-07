
import { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <>
      {<p>filter shown with <input value={ filterText } onChange={ handleFilterChange }/></p>} 
    </>
  )
}

const PersonForm = (props) => {
  //console.log(props)
  return(
    <>
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName || ''} onChange={props.handleName} />
          <br />
          number: <input value={props.newNumber || ''} onChange={props.handleNumber} />
        </div>
        <>
          <button type={props.submit}>add</button>
        </>
      </form>
    </>
  )
}

const Persons = ({ namesToShow, deleteName }) => {
  //console.log(namesToShow)
  return (
    <>    
      {namesToShow.map(person => (
        <p key={person.id}>{person.name} {person.number} <button onClick={() => deleteName(person.id) }>delete</button></p>
      ))}
      
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  //console.log(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const namesToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterText.toLowerCase())
  )

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value)    
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const addNameNumber = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newNumber
  }
      
  const namesInBook = persons.map(person => person.name)
  //console.log(namesInBook)
  if (!(namesInBook.includes(newName))) {
    personService
    .create(nameObj)
    .then(response => {
      setPersons(persons.concat(response.data))
    })
    .catch(error => console.log('Luonti epäonnistui', error)
    )
  } else {
    alert(`${newName} is already added to phonebook`)
  }
  setNewName('')
  setNewNumber('')
  }

  const deleteName = (id) => {
    //console.log(persons)
    const nameToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${nameToDelete.name}`)) {
      personService
        .delName(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Poisto epäonnistui', error)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>      
      <Filter filterText={ filterText } handleFilterChange={ handleFilterChange }/>

      <h3>Add a new</h3>
      <PersonForm addName={ addNameNumber } newName={ newName } handleName={ handleName } 
        newNumber={ newNumber } handleNumber={ handleNumber } submit={'submit'} />

      <h3>Numbers</h3>
      <Persons namesToShow={ namesToShow } deleteName={ deleteName }/>
      
    </div>
  )
}

export default App
