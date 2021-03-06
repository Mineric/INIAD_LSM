import TextDisplay from "../../../../../../../comps/text/TextDisplay"
import { useState } from "react"
import Button from "@mui/material/Button"
import { Dialog, DialogContent, DialogActions} from "@mui/material"
import QuestionEdit from "./QuestionEdit"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const AssignmentFormEdit = ({ onSave, content, assignmentFormId }) => {

    const [assignmentQuestions, setAssignmentQuestions] = useState([...content.assignment_questions]);
    const [openDialogState, setOpenDialogState] = useState(false);
    // only increase, must not decrease
    const [questionNumber, setQuestionNumber] = useState(assignmentQuestions.length)
    const firstAssingmentQuestions = [...content.assignment_questions];
    const saveButtonOnClick = (save) => {
        onSave(save, assignmentQuestions);
    }

    const saveEditorState = () => {
        saveButtonOnClick(true);
    }

    const notSaveEditorState = () => {
        setAssignmentQuestions(firstAssingmentQuestions);
        saveButtonOnClick(false);
    }   

    const onUpdate = (newEditorState) => {
        setAssignmentQuestions(newEditorState);
    }

    const openDialog = () => {
        setOpenDialogState(true);
    }

    const closeDialog = () => {
        setOpenDialogState(false);
    }

    const PARAGRAPH = "PA";

    const addNewQuestion = (index, type) => {
        let newAssignmentQuestions = [...assignmentQuestions]
        const order = index + 1
        // no need for id
        newAssignmentQuestions.splice(index + 1, 0, {
            "question": undefined,
            "order": order,
            "assignment_form_id": assignmentFormId,
            "weight": 100,
            "type": type,
        })
        // re-order and change order
        newAssignmentQuestions = newAssignmentQuestions.map((item, index) => {item.order = index; return item;})
        setAssignmentQuestions(newAssignmentQuestions);
        setQuestionNumber(questionNumber + 1);
    }

    const duplicateQuestion = (index) => {
        let newAssignmentQuestions = [...assignmentQuestions]
        const order = index + 1
        const questionToDup = newAssignmentQuestions[index]
        newAssignmentQuestions.splice(index + 1, 0, {
            ...questionToDup,
        })
        // re-order and change order
        newAssignmentQuestions = newAssignmentQuestions.map((item, index) => {item.order = index; return item;})
        setAssignmentQuestions(newAssignmentQuestions);
        setQuestionNumber(questionNumber + 1)
    }
    const deleteQuestion = (index) => {
        let newAssignmentQuestions = [...assignmentQuestions]
        newAssignmentQuestions.splice(index, 1)
        // re-order and change order
        newAssignmentQuestions = newAssignmentQuestions.map((item, index) => {item.order = index; return item;})
        setAssignmentQuestions(newAssignmentQuestions);
    }

    return (
        <Grid container>
            <Grid item container key={'t1'} xs={12}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    {/* Default question edit view  */}
                    <QuestionEdit 
                        onUpdate={(newRawQuestionState) => {
                            /* Do nothing */
                        }} 
                        addNewQuestion = {() => {addNewQuestion(-1, PARAGRAPH)}}
                        duplicateQuestion = {() => {duplicateQuestion(-1)}}
                        deleteQuestion = {() => {deleteQuestion(-1)}}
                        rawEditorState={null}
                        />
                </Grid>
                <Grid item xs={1} />
            </Grid>
            {assignmentQuestions.map((question, index) => {
                const dupQuestion = {...question}
                return <Grid item container key={index} xs={12}>
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                            <Typography variant="p" color="white">Question{" "}{index + 1}{". "}</Typography>
                            <QuestionEdit 
                                onUpdate={(newRawQuestionState) => {
                                    const newAssignmentQuestions = [...assignmentQuestions]
                                    newAssignmentQuestions[index] = {...newAssignmentQuestions[index]}
                                    newAssignmentQuestions[index].question = newRawQuestionState
                                    setAssignmentQuestions(newAssignmentQuestions)
                                }} 
                                addNewQuestion = {() => {addNewQuestion(index, PARAGRAPH)}}
                                duplicateQuestion = {() => {duplicateQuestion(index)}}
                                deleteQuestion = {() => {deleteQuestion(index)}}
                                rawEditorState={question.question}/>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
            })}
            

            <Button onClick={() => {saveButtonOnClick(true)}}>Save changes</Button>
            <Button onClick={() => {openDialog()}}>Done</Button>
            <Dialog
                open={openDialogState}>
                <DialogContent>Do you want to save your changes?</DialogContent>
                <DialogActions>
                    <Button onClick={() => {saveEditorState()}}>Yes</Button>
                    <Button onClick={() => {notSaveEditorState()}}>No</Button>
                    <Button onClick={() => {closeDialog()}}>Close</Button>
                </DialogActions>
            </Dialog>

            
        </Grid>
    )
}

export default AssignmentFormEdit;