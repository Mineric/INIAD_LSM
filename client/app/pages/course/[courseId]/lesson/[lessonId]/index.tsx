import { useRouter } from "next/router"
import Link from "next/link"
import AssignmentForm from "./assignments/AssignmentForm"
import AssignmentFormEdit from "./assignments/AssignmentFormEdit"

import { useState } from "react"
import { Button } from "@mui/material"

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

const answerData = [
    {
        "id": 1,
        "answer": '{"blocks":[{"key":"17d12","text":"CPU stands for C P U","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        "score": -1,
        "question_id": 1,
        "student_id": 10,        
    }
]

const Lesson = () => {
    const router = useRouter();
    const { lessonId, courseId } = router.query;
    var [assignments, setAssignments] = useState(getData.sort((first, second) => {
        if(first.order < second.order) return -1;
        else if(first.order > second.order) return 1;
        else return 0;
    }))
    const [currentAssignment, setCurrentAssignment] = useState((assignments.length > 0 ? 0 : -1));
    const [editMode, setEditMode] = useState(false)

    const onSave = (save, newRawAssignmentQuestionsState, assignmentIndex) => {
        if(save === true){
            let newAssignments = [...assignments];
            newAssignments[assignmentIndex].assignment_questions = newRawAssignmentQuestionsState
            setAssignments(newAssignments)
            setEditMode(editMode === true ? false : true)
        } else { // if users decide not to save it
            setEditMode(editMode === true ? false : true)
        }
        
    }

    return (
        <>  
            <div>
                <Link 
                    href={"/course/[courseId]/"} 
                    as={`/course/${courseId}/`}>
                    Back to course page
                </Link>
            </div>
            {/* Debug only */}
            <p>Lesson: {lessonId}<br/>Couse: {courseId}</p>
            {/* Chang edit mode */}
            <Button onClick={() => {setEditMode(editMode === true ? false : true)}}>
                {editMode === true ? "Stop edit" : "edit"}
            </Button>
            {/* List out assignments */}
            {assignments.map((item, index) => {
                return (<div key={item.id} onClick={() => {setCurrentAssignment(index)}}>{`Assignment ${index + 1}`}</div>)
            })}
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
                        if(index == 0)  
                            console.log("index " + item.assignment_questions[0].question)
                        
                        return (
                        <div key={item.id}>
                            {currentAssignment == index ? (<AssignmentForm onSubmit={(newEditorState) => {}} content={item} />) : (<></>)}
                            
                        </div>
                        )
                    })
                    
                )
            }
            
            
        </>
    )
}

export default Lesson;