import Link from "next/link";
import { useRouter } from "next/router"
import Typography from "@mui/material/Typography"

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
    // this will be fetched by API later
    // for now, we use dummy data
    const courseName = "Computer Architecture"


    return (
        <>
            {lessons.map((item, index) => {
                return (
                    <>
                        
                        <Link 
                            href={"/course/[courseId]/lesson/[lessonId]"} 
                            as={`/course/${courseId}/lesson/${item.id}`} >
                            {`Lecture ${index + 1}: ${item.lesson_name}`}
                        </Link>
                    </>
                )
            })
            }
        </>
        
    )
}

export default Course;