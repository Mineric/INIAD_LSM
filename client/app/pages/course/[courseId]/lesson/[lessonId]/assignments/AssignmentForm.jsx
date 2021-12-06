import TextEditor from "../../../../../../comps/text/TextEditor"
import TextDisplay from "../../../../../../comps/text/TextDisplay"
import { useState } from "react"
import {Button} from "@mui/material"

const AssignmentForm = ({ onSubmit, content }) => {

    const assignmentQuestions = [...content.assignment_questions];

    const deadline = content.deadline;
    const is_closed = content.is_closed;
    // const assignmentAnswerState = assignmentQuestions.map((e) => {return useState()})

    const submitButtonOnClick = () => {
        onSubmit(assignmentQuestions)
    }

    return (
        <>
            {assignmentQuestions.map((question, index) => {
                console.log("Assignment Form display: ", question.question)
                return <div key={index}>
                    <div>{index + 1}{". "}<TextDisplay rawEditorState={question.question}/></div>
                    <TextEditor onUpdate={(newRawQuestionState) => {
                        // const newAssignmentQuestions = assignmentQuestions
                        // newAssignmentQuestions[index].question = newRawQuestionState
                        // setAssignmentQuestions(newAssignmentQuestions)
                    }}/>
                    </div>
            })}
            <Button onClick={() => {submitButtonOnClick()}}>Submit</Button>
        </>
    )
}

export default AssignmentForm;