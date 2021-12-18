import { useRouter } from "next/router"
import Link from "next/link"
import AssignmentForm from "./assignments/AssignmentForm"
import AssignmentFormEdit from "./assignments/AssignmentFormEdit"

import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import styles from "./layouts.module.css"
import { IndeterminateCheckBoxRounded, NewReleases, QuestionAnswer } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';
import { getAPIURL, fetchWrapper } from "../../../../../../helpers"

const getData = [
    {
        "id": 1,
        "assignment_questions": [
            {
                "id": 1,
                "question": '{"blocks":[{"key":"5v499","text":"Definition of CPU","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                "order": 1,
                "type": "0"
            },
            {
                "id": 2,
                "question": '{"blocks":[{"key":"6tr5i","text":"CPU examples","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                "order": 2,
                "type": "0"
            },
            {
                "id": 3,
                "question": '{"blocks":[{"key":"19a62","text":"CPU prices search","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                "order": 3,
                "type": "0"
            }
        ],
        "order": 1,
        "deadline": null,
        "is_closed": 0,
        "lesson_id": 1,
        "lecturer_id": 4
    },
    {
        "id": 2,
        "assignment_questions": [
            {
                "id": 4,
                "question": '{"blocks":[{"key":"19a12","text":"How CPU works","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                "order": 1,
                "type": "0"
            },
            {
                "id": 5,
                "question": '{"blocks":[{"key":"19b12","text":"How CPU was created","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                "order": 2,
                "type": "0"
            }
        ],
        "order": 2,
        "deadline": null,
        "is_closed": 0,
        "lesson_id": 1,
        "lecturer_id": 4
    },
    {
        "id": 3,
        "assignment_questions": [
            {
                "id": 6,
                "question": '{"blocks":[{"key":"18u12","text":"First CPU creation","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                "order": 1,
                "type": "0"
            },
            {
                "id": 7,
                "question": '{"blocks":[{"key":"19d12","text":"CPU stands for what?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                "order": 2,
                "type": "0"
            }
        ],
        "order": 3,
        "deadline": null,
        "is_closed": 0,
        "lesson_id": 1,
        "lecturer_id": 4
    }
]

// not final structure
const answerData = [
    {
        "id": 1,
        "answer": '{"blocks":[{"key":"17d12","text":"CPU stands for C P U","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        "score": -1,
        "question_id": 1,
        "student_id": 10,        
    },
    {
        "id": 2,
        "answer": '{"blocks":[{"key":"17d12","text":"CPY stands for C P Y","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        "score": -1,
        "question_id": 2,
        "student_id": 10,        
    }
]

const Lesson = () => {
    const router = useRouter();
    const { lessonId, courseId } = router.query;
    // var [assignments, setAssignments] = useState(getData.sort((first, second) => {
    //     if(first.order < second.order) return -1;
    //     else if(first.order > second.order) return 1;
    //     else return 0;
    // }))
    var [assignments, setAssignments] = useState(getData)
    const [currentAssignment, setCurrentAssignment] = useState((assignments.length > 0 ? 0 : -1));
    const [editMode, setEditMode] = useState(false)
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        setAnswers(answerData)
    }, [])

    const createNewAssignment = () => {
        const newAssignments = [...assignments];
        newAssignments.push(
            {
                "id": (-1) * newAssignments.length,
                "assignment_questions": [
                ],
                "order": 1,
                "deadline": null,
                "is_closed": 0,
                "lesson_id": 1,
                "lecturer_id": 4
            },
        )
        setAssignments(newAssignments)
    }

    // another useEffect to submit on answers state change

    const onSave = (save, newRawAssignmentQuestionsState, assignmentIndex) => {
        if(save === true){
            let newAssignments = [...assignments];
            newAssignments[assignmentIndex] = {...newAssignments[assignmentIndex]}
            newAssignments[assignmentIndex].assignment_questions = newRawAssignmentQuestionsState
            setAssignments(newAssignments)
            /* The assignments with id in format "t..." is newly created one without id */
            // update on server
            const UpdateURL =  getAPIURL("/viewset/assignment-question/update_bulk/")
            fetchWrapper.post(UpdateURL, newAssignments.filter((question) => question.id && question.id.toString()[0] !== 't'))
            // create on server
            fetchWrapper.post(UpdateURL, newAssignments.filter((question) => question.id && question.id.toString()[0] !== 't').map((question) => {
                const newQuestion = {...question};
                delete newQuestion["id"];
                return newQuestion;
            })).then(data => {
                console.log("Create: ", data);
            })

            setEditMode(editMode === true ? false : true);

        } else { // if users decide not to save it
            setEditMode(editMode === true ? false : true)
        }
    }

    const onSubmit = (newRawAnswerState, answerIndex) => {
        let newAnswers = [...answers]
        newAnswers[answerIndex] = {...newAnswers[answerIndex]}
        newAnswers[answerIndex].answer = newRawAnswerState
        setAnswers(newAnswers)
    }

    return (
        <Box sx={{

        }}>
            <Grid container className={styles.page}>
                <Grid item xs={12}>
                    <Link 
                        href={"/course/[courseId]/assignments"} 
                        as={`/course/${courseId}/assignments`}>
                        <Typography variant="p" color="white" className={styles.link}>Back to course page</Typography>
                    </Link>
                </Grid>
                
                <Grid item container xs={12}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" color="white" marginLeft="5%">{`Lesson 1${lessonId} Assignments`}</Typography>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                
                <Grid container item xs={12}>
                    <Grid container item xs={9}>
                        {assignments.map((item, index) => {
                            return (<Grid item xs={3} key={item.id} onClick={() => {setCurrentAssignment(index)}}>
                                        <Typography variant="p" color="white" marginLeft="5%" className={styles.link}>{`Assignment ${index + 1}`}</Typography>
                                    </Grid>)
                        })}
                        <Grid item xs={3} key={'t1'} onClick={() => {createNewAssignment()}}>
                            <Grid container direction="row" alignItems="center" marginLeft="5%">
                                <Grid item>
                                    <AddIcon sx={{"color": "white"}} />
                                </Grid>
                                <Grid item>                                       
                                    <Typography variant="p" color="white" marginLeft="5%" className={styles.link}>New</Typography>
                                </Grid>
                            </Grid> 
                        </Grid>
                    </Grid>
                    {/* List out assignments */}
                    
                    {/* Chang edit mode */}
                    <Grid item xs={3}>
                        <Button onClick={() => {setEditMode(editMode === true ? false : true)}}>
                            {editMode === true ? "Stop edit" : "edit"}
                        </Button>
                    </Grid>
                </Grid>
                
                <Grid container item xs={12}>
                    {/* <Grid item xs={1}></Grid> */}
                    {/* <Grid item xs={10}> */}
                        {  editMode === true ?
                        (
                            assignments.map((item, index) => {
                                return (
                                    <div key={item.id}>
                                        {currentAssignment == index ? (<AssignmentFormEdit onSave={(save, newEditorState) => {onSave(save, newEditorState, currentAssignment)}} content={item} />) : (<></>)}
                                    </div>
                                    )
                            })
                        ) : 
                        (
                            assignments.map((item, index) => {
                               
                                return (
                                <div key={item.id}>
                                    {currentAssignment == index ? (<AssignmentForm onSubmit={(newEditorState) => {onSubmit(newEditorState, currentAssignment)}} content={item} />) : (<></>)}
                                    
                                </div>
                                )
                            })
                            
                        )
                    }
                    {/* </Grid> */}
                    {/* <Grid item xs={1}></Grid> */}
                </Grid>
            </Grid>
        </Box>
        
    )
}

export default Lesson;