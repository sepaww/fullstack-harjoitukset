
import { useState } from 'react'
import Former from "./Former"
const Handler = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ]) 
      const [newName, setNewName] = useState('')
      const [newNumber, setNewNumber] = useState('')
      const [current_search, setSearch] = useState('');
    
      const addPersons = (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          id: persons.length + 1,
          number: newNumber
        }
        if ( persons.some((person) => person.name == personObject.name ) ){
          alert(newName + " already in phonebook")
          return
        }
        if (personObject.name!="" ){
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber("")
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
