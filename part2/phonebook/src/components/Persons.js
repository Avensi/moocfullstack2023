const Persons = ({persons}) => {
    return (
        <>
        {persons.map((person,i) => <p key={i}> {person.name}</p>)}
        </>
    )
}

export default Persons