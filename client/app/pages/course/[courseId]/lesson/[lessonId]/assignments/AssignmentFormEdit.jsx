import TextEditor from "../../../../../../comps/text/TextEditor"
import TextDisplay from "../../../../../../comps/text/TextDisplay"
import { useState } from "react"
import Button from "@mui/material/Button"
import { Dialog, DialogContent, DialogActions} from "@mui/material"

const AssignmentFormEdit = ({ onSave, content }) => {

    const [assignmentQuestions, setAssignmentQuestions] = useState([...content.assignment_questions]);

    const [open, setOpen] = useState(false);
    const firstAssingmentQuestions = [...content.assignment_questions];
    // const assignmentAnswerState = assignment_questions.map((e) => {return useState()})

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
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    return (
        <>
            {assignmentQuestions.map((question, index) => {
                const dupQuestion = {...question}
                return <div key={index}>
                        <div>{index + 1}{". "}</div>
                        <TextEditor onUpdate={(newRawQuestionState) => {
                            const newAssignmentQuestions = [...assignmentQuestions]
                            newAssignmentQuestions[index] = {...newAssignmentQuestions[index]}
                            newAssignmentQuestions[index].question = newRawQuestionState
                            setAssignmentQuestions(newAssignmentQuestions)
                        }} rawEditorState={question.question}/>
                    </div>
            })}
            <Button onClick={() => {saveButtonOnClick(true)}}>Save changes</Button>
            <Button onClick={() => {openDialog()}}>Done</Button>
            <Dialog
                open={open}>
                <DialogContent>Do you want to save your changes?</DialogContent>
                <DialogActions>
                    <Button onClick={() => {saveEditorState(true)}}>Yes</Button>
                    <Button onClick={() => {notSaveEditorState(false)}}>No</Button>
                    <Button onClick={() => {closeDialog()}}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignmentFormEdit;