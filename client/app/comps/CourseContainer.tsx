import CourseCard from "./CourseCard";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import coursesData from '../pages/api/courses';
import DifferntCard from './DifferentCard';

const c = [1,2,3];
// background-color: #2a2a72;
// backgroundImage: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%),
const CourseContainter = () => {
    console.log(c);
    return (

        <Box>

        <Grid container
                justifyContent="center"
                style={{color: 'white', backgroundColor: '#0F0838' , marginTop: '0px'}}>

                {/* <CourseCard/>    
                <CourseCard/>   
                <CourseCard/>  */}

        
            <Typography sx align='left' variant="h2" color="text.secondary"
                style={{color: 'white', backgroundColor: '#0F0838', marginTop: '20px'}}>
                 Most popular courses...
            </Typography>
   
            <Grid container
                justifyContent="center"
                style={{color: 'white' ,backgroundColor: '#0F0838' , marginTop: '50px', marginBottom: '80px'}}>    
                <DifferntCard/>     
                <DifferntCard/>  
                <DifferntCard/>  
                <DifferntCard/>   
                
            </Grid>  
 
        </Grid>


            <Grid container
            justifyContent="center"
            style={{ minHeight: '100vh' , marginTop: '50px'}}>

            {/* <CourseCard/>    
            <CourseCard/>   
            <CourseCard/>  */}


            <DifferntCard/>     
            <DifferntCard/>  
            <DifferntCard/>  
            <DifferntCard/>      

            <DifferntCard/>     
            <DifferntCard/>  
            <DifferntCard/>  
            <DifferntCard/>    

            <DifferntCard/>     
            <DifferntCard/>  
            <DifferntCard/>  
            <DifferntCard/>    

            </Grid>
        </Box>
           
    )
}

export default CourseContainter;