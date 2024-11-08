
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
      <form onSubmit={props.addNameNumber}>
        <div>
          name: <input value={props.newName || ''} onChange={props.handleName} />
          <br />
          number: <input value={props.newNumber || ''} onChange={props.handleNumber} />
        </div>
        <>
          <button type='submit'>add</button>
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
    const existingPerson = persons.find(person => person.name === newName)
    console.log(existingPerson)
    const nameObj = { name: newName, number: newNumber }
  
    if (existingPerson) {
      changeNumber(existingPerson.id, newNumber)
    } else {
      personService.create(nameObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log('Luonti epäonnistui', error))
    }
  }
  

  const deleteName = (id) => {
    //console.log(persons)
    const nameToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${nameToDelete.name}?`)) {
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

  const changeNumber = (id, newNumber) => {
    const personToUpdate = persons.find(person => person.id === id)
    console.log(personToUpdate)
  
    if (personToUpdate) {
      if (personToUpdate.number !== newNumber) {
        if (window.confirm(`${personToUpdate.name} is already in the phonebook, replace the old number with the new one?`)) {
          const updatedPerson = { ...personToUpdate, number: newNumber }
          console.log(updatedPerson)
  
          personService
            .update(id, updatedPerson)
            .then((response) => {
              setPersons(persons.map(person => 
                person.id !== id ? person : response.data
              ))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              console.log('Numeronvaihto epäonnistui', error)
            })
        }
      } else {
        alert(`${personToUpdate.name} already has this number.`)
      }
    }
  }
  

  return (
    <div>
      <h1>Phonebook</h1>      
      <Filter filterText={ filterText } handleFilterChange={ handleFilterChange }/>

      <h3>Add a new</h3>
      <PersonForm addNameNumber={ addNameNumber } newName={ newName } handleName={ handleName } 
        newNumber={ newNumber } handleNumber={ handleNumber } />

      <h3>Numbers</h3>
      <Persons namesToShow={ namesToShow } deleteName={ deleteName }/>
      
    </div>
  )
}


export default App
