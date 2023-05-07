const Header = ({text}) => <h1>{text}</h1>
const Part = ({content, exercises}) => <p>{content} {exercises}</p>
const Content = ({parts}) => parts.map((part) => {return (<Part key={part.id} content={part.name} exercises={part.exercises}/>)})
const Total = ({parts}) => <b>Total of {parts.reduce((sum, part)=>{return sum+part.exercises}, 0) } exercises</b>

const Course = ({courses}) => {
    return (
        courses.map((course) => {
        return(
            <div key={course.id}>
            <Header text={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
            </div>
        )
        })
    )
}

export default Course