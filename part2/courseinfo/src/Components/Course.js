import Header from "./Header"
import Part from "./Part"
import Total from "./Total"

const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        {course.parts.map(part => <Part key={part.id} part={part}/>)}
        <Total course={course} />
      </>
    )
  }
  
  export default Course