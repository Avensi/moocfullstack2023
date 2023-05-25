const Header = (props) => {
  return (

    <h1>{props.course.name}</h1>

  )
}
const Content = (props) => {
  return (
    <>
      <Part name={props.course.parts[0].name} exercice={props.course.parts[0].exercises}/> 
      <Part name={props.course.parts[1].name} exercice={props.course.parts[1].exercises}/> 
      <Part name={props.course.parts[2].name} exercice={props.course.parts[2].exercises}/> 
    </>
  )
}
 

const Total = (props) => {
  return (
    <p>Number of exercices {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} </p>
  )
}
 
const Part = (props) => {
  return (
    <p>{props.name} {props.exercice}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
  
    </div>
  )
}

export default App