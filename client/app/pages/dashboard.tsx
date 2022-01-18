
import CourseCard from '../comps/CourseCard';
import CourseContainter from '../comps/CourseContainer';
import CourseSkeleton from '../comps/CourseSkeleton';
import Drawer from '../comps/Drawer';
import Grid from '@mui/material/Grid';
const drawerWidth = 240;

const dashboard = () => {
    return (
        <>  
            <Grid item style={{ display:"flex", alignItems:"center"}}>
                <CourseContainter />
            </Grid>
        </>


    )
}

export default dashboard;




