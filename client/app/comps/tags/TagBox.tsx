import { makeStyles } from '@mui/styles';

const TagBox = ({text, selected, handleTagClick, tagBoxClassName, selectedClassName, unselectedClassName}) => {
    const styles = useStyles();
    const selectedCN = selectedClassName ? selectedClassName : styles.selected;
    const unselectedCN = unselectedClassName ? unselectedClassName : styles.unselected;
    return (<span className={`${(selected ? selectedCN : unselectedCN)} ${tagBoxClassName}`} onClick={handleTagClick}>
        {text}
    </span>)
}

const useStyles = makeStyles({
    selected: {
        opacity: 1.0,
        "&:hover": {
            "cursor": "pointer"
        }
    },
    unselected: {
        opacity: 0.5,
        "&:hover": {
            "cursor": "pointer"
        }
    }
})

export default TagBox;