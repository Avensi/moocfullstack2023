import Header from "./Header"
import Part from "./Part"

const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        {course.parts.map(part => <Part key={part.id} part={part}/>)}
      </>
    )
  }
  
  export default Course