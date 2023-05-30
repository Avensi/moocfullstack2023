import Person from "./Person"

const Persons = ({persons, erasePerson}) => {
    return (
        persons.map(person => <> <Person key={person.id} person={person} erasePerson={() => erasePerson(person.id)}/>  </>)
    )
}

export default Persons