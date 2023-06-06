import Person from "./Person"

const Former = ({ filteredPersons }) => {
    return (
        <ul>
        {filteredPersons.map(person => 
            <Person key={person.id} person={person} />
          )}
        </ul>
    )
}
export default Former