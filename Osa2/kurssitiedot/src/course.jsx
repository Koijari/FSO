
const Content = ({ course }) => {
  const totalExercises = course.parts.map(part => part.exercises)
  //console.log(totalExercises)
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

export default Course