import Link from "next/link";
import { useRouter } from "next/router"

const getData = {
    "lessons": [
        {
            "id": 1,
            "lesson_name": "01-CPU",
            "date_start": null,
            "date_end": null
        },
        {
            "id": 2,
            "lesson_name": "02-Memory",
            "date_start": null,
            "date_end": null
        },
    ]
}
const Course = () => {
    const router = useRouter();
    const { courseId } = router.query;
    // get Data using courseId -> getData
    const {lessons, } = getData;

    return (
        <>
            {lessons.map((item, index) => {
                return (
                    <div>
                        <Link 
                            href={"/course/[courseId]/lesson/[lessonId]"} 
                            as={`/course/${courseId}/lesson/${item.id}`} >
                            {`Lecture ${index + 1}: ${item.lesson_name}`}
                        </Link>
                    </div>
                )
            })
            }
        </>
        
    )
}

export default Course;