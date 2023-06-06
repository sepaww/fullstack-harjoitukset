
import { useState, useEffect } from 'react'
import Former from "./Former"
import Notification from "./Note"
import personService from './connector'

const Handler = () => {
    //const [persons, setPersons] = useState([
        //{ name: 'Arto Hellas', number: '040-123456' },
        //{ name: 'Ada Lovelace', number: '39-44-5323523' },
        //{ name: 'Dan Abramov', number: '12-43-234345' },
        //{ name: 'Mary Poppendieck', number: '39-23-6423122' }
      //]) 
      const [persons, setPersons] = useState([])
      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')
      const [current_search, setSearch] = useState('');
      const emptynote = {content: null, type: false}
      const [errorMessage, setErrorMessage] = useState({
        content: null,
        type: true
        }
      )
      
      const hook = () => {
        console.log('effect')
        personService
          .getAll()
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
      }
      
      useEffect(hook, [])
      console.log('render', persons.length, 'persons')

      const addPersons = (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          id: persons.length + 1,
          number: newNumber
        }
        if ( persons.some((person) => person.name === personObject.name ) ){
          if (window.confirm(`Are you sure you want to update ${newName}?`)) {
            const Newmsg={content: "succesfully updated persons info", type: false}
            setErrorMessage(Newmsg)
            setTimeout(() => {
              setErrorMessage(emptynote)
            }, 5000)
            const sameperson = persons.find(person => person.name === personObject.name);
            const id = sameperson.id
            personObject.id=id
            personService
            .update(personObject.id, personObject)
            .then(response => {
              console.log('Value updated successfully:', response.data)
            setNewName('')
            setNewNumber("")  
            })
          }
          return
        }
        if (personObject.name!=="" ){
          const Newmsg={content: "succesfully created persons info", type: false}
            setErrorMessage(Newmsg)
            setTimeout(() => {
              setErrorMessage(emptynote)
            }, 5000)
          personService
          
          .create(personObject)
          .then(response => {
            console.log(response)
          })
        
        setNewName('')
        setNewNumber("")
        } else {
          const Newmsg={content: "no name given", type: true}
            setErrorMessage(Newmsg)
            setTimeout(() => {
              setErrorMessage(emptynote)
            }, 5000)
        }
      }
      
      const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    
      }
    
      const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
      }
    
      const handleSearch = (event) => {
        setSearch(event.target.value);
      }
    
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(current_search.toLowerCase())
      )
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
      <form onSubmit={addPersons}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
          <br />
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
      <div>
        <input
          placeholder="Search by name"
          onChange={handleSearch}
        />
      </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Former filteredPersons={filteredPersons}/>
        </div>

    )
}
export default Handler
