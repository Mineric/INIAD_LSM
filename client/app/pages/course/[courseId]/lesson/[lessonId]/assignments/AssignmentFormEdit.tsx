import TextDisplay from "../../../../../../comps/text/TextDisplay"
import { useState } from "react"
import Button from "@mui/material/Button"
import { Dialog, DialogContent, DialogActions} from "@mui/material"
import QuestionEdit from "./QuestionEdit"

const AssignmentFormEdit = ({ onSave, content }) => {

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

    const PARAGRAPH = 0;

    const addNewQuestion = (index, type) => {
        let newAssignmentQuestions = [...assignmentQuestions]
        const order = index + 1
        newAssignmentQuestions.splice(index + 1, 0, {
            "id": "t" + questionNumber.toString(),
            "question": undefined,
            "order": order,
            "type": type,
        })
        // re-order and change order
        newAssignmentQuestions = newAssignmentQuestions.map((item, index) => {item.order = index; return item;})
        setAssignmentQuestions(newAssignmentQuestions);
        setQuestionNumber(questionNumber + 1)
    }

    const duplicateQuestion = (index) => {
        let newAssignmentQuestions = [...assignmentQuestions]
        const order = index + 1
        const questionToDup = newAssignmentQuestions[index]
        newAssignmentQuestions.splice(index + 1, 0, {
            ...questionToDup,
            "id": "t" + questionNumber.toString(),
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
        <>
            {assignmentQuestions.map((question, index) => {
                const dupQuestion = {...question}
                return <div key={question.id}>
                        <div>{index + 1}{". "}</div>
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
                    </div>
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

            
        </>
    )
}

export default AssignmentFormEdit;