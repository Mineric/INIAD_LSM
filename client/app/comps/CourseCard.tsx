import Image from 'next/image';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import * as React from 'react';

import coursesData from '../pages/api/courses';
import courses from '../pages/api/courses';


interface Courses {
    name: string;
    lecturer: string;
    date: string;
    id: number;
    attendees: number;
}

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

// const c = {name:"python", lecturer: "Mr. Smith", date: "2021, Sept 10", id: 12, attendees: 4};


const c = async () => {
    const res = await fetch('http://127.0.0.1:8000/viewset/Courses/');
    const data = await res.json();
    
    console.log
    return {
      props: { c: data }
    }
  }

export default function CourseCard() {

    const course: Courses = {
        name: c.course_name,
        lecturer: c.lecturer,
        date: c.date,
        id: c.id,
        attendees: c.attendees,
    };

    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);

    return (
            <section >
                    <Card  style={{ }}sx={{ backgroundColor: "#5039D9", maxWidth: 350, padding: 1, borderRadius:"15px"}}>

                        {/* <CardMedia
                            component="img"
                            alt="course-bg-wallpaper"
                            width="300"
                            height="300"
                            image="./assets/python.png"
                            borderradius = "15px"
                        /> */}
                      

                     
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="div">
                                {courses.name}
                            </Typography>

                            <img src="./assets/python.png" width="400" height="100"/>
                         
                            <Typography variant="body2" color="text.secondary">
                            {course.lecturer}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {course.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                           
                           </Typography>

                
                        </CardContent> 


                        <Box sx={{
                                width: 400,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}

                                // onChange={(event, newValue) => {
                                // setValue(newValue);
                                // }}
                                // onChangeActive={(event, newHover) => {
                                // setHover(newHover);
                                // }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />

                            {value !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                            )}

                        </Box>


                        <CardActions>
                            <Button size="small" style={{color:"red"}}>Share</Button>
                            {/* <Button size="small">Learn More</Button> */}
                        </CardActions>


                        <Link href="/CourseSkeleton"><a> To Course </a></Link>

                        
                    </Card>


        </section>
    )
}
