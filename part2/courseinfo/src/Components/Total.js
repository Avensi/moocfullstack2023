

const Total = ({course}) => {
    return(
        <b>total of {course.parts.reduce((accumulator, currentValue) => {
            return (
                accumulator + currentValue.exercises 
            )   
        },0)} exercices</b>
    )
    
}

export default Total