import Link from "next/link";
import { useRouter } from "next/router"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import { blue } from "@mui/material/colors";
import styles from "./layouts.module.css"
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

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
    const [lessons, setLessons] = useState(getData.lessons);
    // this will be fetched by API later
    // for now, we use dummy data
    const courseName = "Computer Architecture"

    const addLessonOnClick = () => {
        const newLesson = [...lessons];
        // normally would be create before saving here
        // create lesson API here

        newLesson.push({
            "id": newLesson.length, // fake id
            "lesson_name": "",
            "date_start": null,
            "date_end": null
        },)
        setLessons(newLesson);
    } 

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
                <Grid container item xs={12} 
                    onClick={() => addLessonOnClick()} >
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
                                        <Grid container direction="row" alignItems="center" marginLeft="5%">
                                            <Grid item>
                                                <AddIcon sx={{"color": "white"}}/>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h5" color="white" >
                                                    {'\t'}Add new lesson
                                                </Typography>
                                            </Grid>
                                        </Grid>                                    
                                </Box>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
            </Grid>
            
        </Grid>
        
    )
}

export default Course;