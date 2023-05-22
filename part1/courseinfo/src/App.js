const Header = (props) => {
  return (

    <h1>{props.course}</h1>

  )
}

const Content = (props) => {
  return (
    <>
    <Part content={props.content[0]} exercices={props.exercices[0]}/>
    <Part content={props.content[1]} exercices={props.exercices[1]}/>
    <Part content={props.content[2]} exercices={props.exercices[2]}/>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercices {props.exercices[0] + props.exercices[1] + props.exercices[2]} </p>
  )
}

const Part = (props) => {
  return (

    <p>{props.content} {props.exercices}</p>

  )
}

const App = () => {
  // const-definitions
  const course = ['Half Stack application development']
  const content = ['Fundamentals of React', 'Using props to pass data','State of a component']
  const exercices = [10,7,14]

  return (
    <div>
      <Header course={course} />
      <Content content={content} exercices={exercices}/>
      <Total exercices={exercices} />
    </div>
  )
}

export default App