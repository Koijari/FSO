
const Header = ({ headLine }) => <h1>{ headLine }</h1>

const Content = ({ course }) => {
  const totalExercises = course.parts.map(part => part.exercises)
  console.log(totalExercises)
  return (
    <>
      <h2 key={ course.id }>{ course.name }</h2>
      <Part key={ course.parts.id } parts={ course.parts } />
      <h4>total of {totalExercises.reduce((total, value) => total + value, 0)} exercises</h4>
    </>
  )
}

const Part = ({ parts }) => {
  //console.log(parts)
  return (
    <>
    {parts.map( part =>
      <p key={part.id}>{part.name} {part.exercises}</p>
    )}
    </>
  )
}

const Course = ({ courses }) => {
  //console.log(courses)  
  return (
  <>
    {courses.map(course => 
      <Content key={course.id} course={course} />
    )}
  </>
  )
}


const App = () => {
  const headLine = 'Web development curriculum'
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header headLine={headLine} />
      <Course courses={courses} />
    </div>
  )
}

export default App
