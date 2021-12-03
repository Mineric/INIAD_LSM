import TextEditor from "../text/TextEditor"

const AssignmentForm = ({content}) => {
    
    const assignment_questions = content.assignment_questions;
    const deadline = content.deadline;
    const is_closed = content.is_closed;
    console.log(assignment_questions)
    const assignmentAnswerState = assignment_questions.map((e) => {return useState()})
    
    return (
        <>
            {assignment_questions.map((question, index) => {
                return <div key={index}>{index + 1}{". "}{question.question}</div>
            })}
            <TextEditor />
        </>
    )
}

export default AssignmentForm;