
const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ parts }) => {
  console.log(parts)
  const exercises = parts.map(total => total.exercises)
  console.log(exercises)
  return (
  <>
    <Part courseParts={parts} />
    <h4>Total of {exercises.reduce((total, value) => total + value, 0)} exercises</h4>
  </>
  )
}

const Part = ({ courseParts }) => {
  //console.log(parts.name, parts.exercises, parts.id)
  return(
    <>
      {courseParts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      
    </>
  )
}

const Course = ({ course }) => {
  //console.log(course.parts)
  return (
  <>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
  </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ] 
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
