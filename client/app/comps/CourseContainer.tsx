import CourseCard from "./CourseCard";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import coursesData from '../pages/api/courses';

const c = [1,2,3];

const CourseContainter = () => {
    console.log(c);
    return (
        <Grid container >

                <CourseCard/>    
                <CourseCard/>   
                <CourseCard/>           

        </Grid>
           
    )
}

export default CourseContainter;