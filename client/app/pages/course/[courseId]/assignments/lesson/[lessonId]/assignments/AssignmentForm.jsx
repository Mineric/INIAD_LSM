import TextEditor from "../../../../../../../comps/text/TextEditor"
import TextDisplay from "../../../../../../../comps/text/TextDisplay"
import { useState } from "react"
import {Button} from "@mui/material"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import styles from "./layouts.module.css"

const AssignmentForm = ({ onSubmit, content, lessonAnswersState, onUpdateAnswer}) => {

    const assignmentQuestions = [...content.assignment_questions];
    const [answers, setAnswer] = useState([...lessonAnswersState])
    const deadline = content.deadline;
    const is_closed = content.is_closed;

    const submitButtonOnClick = () => {
        onSubmit(assignmentQuestions);
    }

    const findAnswer = (question_id) => {
        const answer = answers.find(answer => answer.question_id === question_id)
        if(answer) return answer.answer;
        else return undefined;
    }

    const replaceAnswer = (question_id, newAnswerState) => {
        const answerIndex = answers.findIndex(answer => answer.question_id === question_id);
        console.log("Answer index: ", answerIndex)
        if(answerIndex !== -1){
            let newAnswers = [...answers]
            newAnswers[answerIndex] = {...newAnswers[answerIndex]} // avoid implicit reference
            newAnswers[answerIndex].answer = newAnswerState
            setAnswer(newAnswers)
            onUpdateAnswer(answers)
        } else{ // have not created the answer yet (both on client and server)
            let newAnswers = [...answers]
            // crate new answer
            newAnswers.push({
                "answer": "",
                "score": -1,
                "question_id": question_id,
            })
            setAnswer(newAnswers)
            onUpdateAnswer(newAnswers)
        }
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
                                rawEditorState={findAnswer(question.id)} 
                                onUpdate={(newRawAnswerState) => {
                                    replaceAnswer(question.id, newRawAnswerState)                                    
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