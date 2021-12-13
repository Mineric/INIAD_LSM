import Link from "next/link";
import { useRouter } from "next/router"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import { blue } from "@mui/material/colors";
import styles from "./layouts.module.css"

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
        <Grid container className={styles.page}>
            <Grid item xs={12}>
                <Box sx={{
                    display:"flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography variant="h5" color="white" margin="auto">Assignments (Weekly)</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {lessons.map((item, index) => {
                    return (
                        <Link 
                                        href={"/course/[courseId]/assignments/lesson/[lessonId]"} 
                                        as={`/course/${courseId}/assignments/lesson/${item.id}`} >
                        <Grid container item xs={12} >
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <Box component="div"
                                    sx={{
                                        // width: 1,
                                        height: "90px",
                                        backgroundColor: 'rgb(0, 133, 255, 0.65)',
                                        marginTop: "20px",
                                        marginBottom: "20px",
                                        alignItems: "center",
                                        display: "flex",
                                        
                                        '&:hover': {
                                        border: "5px solid blue",
                                        // opacity: [0.9, 0.8, 0.7],
                                        },
                                    }} className={styles.lessonBox}>
                                    
                                        <Typography variant="h5" color="white" marginLeft="5%">{`Lecture ${index + 1}: ${item.lesson_name}`}</Typography>
                                    
                                </Box>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
                        </Link>
                    )
                })
                }
            </Grid>
            
        </Grid>
        
    )
}

export default Course;