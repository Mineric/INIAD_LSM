import { useRouter } from "next/router"
import Link from "next/link"
import AssignmentForm from "../../../../../comps/assignments/AssignmentForm"
import { useState } from "react"

const getData = [
    {
        "id": 1,
        "assignment_questions": [
            {
                "id": 1,
                "question": "Definition of CPU",
                "order": 1,
                "type": "0"
            },
            {
                "id": 2,
                "question": "CPU examples",
                "order": 2,
                "type": "0"
            },
            {
                "id": 3,
                "question": "CPU prices research",
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
                "question": "How CPU works",
                "order": 1,
                "type": "0"
            },
            {
                "id": 5,
                "question": "How CPU was  created",
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
                "question": "First CPU creation",
                "order": 1,
                "type": "0"
            },
            {
                "id": 7,
                "question": "CPU stands for what?",
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

const Lesson = () => {
    const router = useRouter();
    const { lessonId, courseId } = router.query;
    var assignments = getData.sort((first, second) => {
        if(first.order < second.order) return -1;
        else if(first.order > second.order) return 1;
        else return 0;
    })
    const [currentAssignment, setCurrentAssignment] = useState((assignments.length > 0 ? 0 : -1));
    console.log(assignments)
    return (
        <>  
            <div>
                <Link 
                    href={"/course/[courseId]/"} 
                    as={`/course/${courseId}/`}>
                    Back to course page
                </Link>
            </div>
            <p>Lesson: {lessonId}<br/>Couse: {courseId}</p>
            {assignments.map((item, index) => {
                return (<div key={item.id} onClick={() => {setCurrentAssignment(index)}}>{`Assignment ${index + 1}`}</div>)
            })}
            {assignments.map((item, index) => {
                return <div key={item.id}>{currentAssignment == index? (<AssignmentForm content={item} />) : (<></>)}</div>
            })}
        </>)
}

export default Lesson;