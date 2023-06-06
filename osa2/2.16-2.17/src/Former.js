import Person from "./Person"

const Former = ({ filteredPersons }) => {
    return (
        <ul>
        {filteredPersons.map(person => 
            <Person key={person.id} person={person} persons={filteredPersons} />
          )}
        </ul>
    )
}
export default Former