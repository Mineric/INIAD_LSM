import TextEditor from "../../../../../../../comps/text/TextEditor"
import TextDisplay from "../../../../../../../comps/text/TextDisplay"
import { useState } from "react"
import {Button} from "@mui/material"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import styles from "./layouts.module.css"

const AssignmentForm = ({ onSubmit, content, answersState}) => {

    const assignmentQuestions = [...content.assignment_questions];
    const answers = [...answersState]
    const deadline = content.deadline;
    const is_closed = content.is_closed;
    // const assignmentAnswerState = assignmentQuestions.map((e) => {return useState()})

    const submitButtonOnClick = () => {
        onSubmit(assignmentQuestions)
    }

    return (
        <Grid container>
            {assignmentQuestions.map((question, index) => {
                return <Grid container item key={index} xs={12}>
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                            <div>
                                <Typography variant="p" color="white">Question{" "}{index + 1}{". "}</Typography>
                                <TextDisplay rawEditorState={question.question}/>
                            </div>
                            <TextEditor 
                                rawEditorState={} 
                                onUpdate={(newRawAnswerState) => {
                                // const newAssignmentQuestions = assignmentQuestions
                                // newAssignmentQuestions[index].question = newRawQuestionState
                                // setAssignmentQuestions(newAssignmentQuestions)
                            }}/>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
            })}
            <Button onClick={() => {submitButtonOnClick()}}>Submit</Button>
        </Grid>
    )
}

export default AssignmentForm;