const Person = ({person, erasePerson}) => {
    return(

        <p>{person.name} {person.number} <button onClick={erasePerson}>delete</button></p>  
    )
}

export default Person