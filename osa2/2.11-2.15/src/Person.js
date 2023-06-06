import personService from './connector'

const Person = ({ person }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete " + person.name + "?")) {
      personService
        .remove(person.id)
        .then(response => {
          console.log("Value removed successfully ", response.data)
          // Handle any additional logic after successful deletion
        })
        .catch(error => {
          console.error(" Error removing value ", error)
        })
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