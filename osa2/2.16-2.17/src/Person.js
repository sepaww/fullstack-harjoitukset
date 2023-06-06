import personService from './connector'
import { useState} from 'react'
const Person = ({ person, persons }) => {

  const [personas, setPersonas] = useState([])
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete " + person.name + "?")) {
      personService
      .getAll()
      .then(response => {
      setPersonas(response.data)
    })
      console.log(persons)
      if ( personas.some((persona) => persona.id === person.id ) ){
      personService
        .remove(person.id)
        .then(response => {
          console.log("Value removed successfully ", response.data)
          // Handle any additional logic after successful deletion
        })
        .catch(error => {
          console.error(" Error removing value ", error)
        })
      } else {
        alert(person.name + " has already been deleted")
      }
    }
    
  }
    return (
        <div>
      <li>{person.name}</li>
      <li>{person.number}</li>
      <button onClick={handleDelete}>Delete</button>
      <br></br>
      </div>
    )
  }

export default Person