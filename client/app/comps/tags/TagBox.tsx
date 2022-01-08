import { makeStyles } from '@mui/styles';

const TagBox = ({text, selected, handleTagClick}) => {
    const styles = useStyles();
    return (<span className={(selected ? styles.selected : styles.unselected)} onClick={handleTagClick}>
        {text}
    </span>)
}

const useStyles = makeStyles({
    selected: {
        opacity: 1.0
    },
    unselected: {
        opacity: 0.5
    }
})

export default TagBox;