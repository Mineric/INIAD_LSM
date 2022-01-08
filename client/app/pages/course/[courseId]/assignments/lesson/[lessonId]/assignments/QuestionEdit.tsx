import { Divider, Popover } from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextEditor from "../../../../../../../comps/text/TextEditor"
import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton';
import { useState } from "react"
import { makeStyles } from '@mui/styles';

// icon
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SortIcon from '@mui/icons-material/Sort';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import styles from "./layouts.module.css"

const QuestionEdit = ({ rawEditorState, onUpdate, addNewQuestion, duplicateQuestion, deleteQuestion }) => {
    const [addQArchonEl, setAddQArchonEl] = useState(null);
    const classes = useStyles();

    const openAddPopover = (event) => {
        setAddQArchonEl(event.currentTarget);
    }

    const closeAddPopover = () => {
        setAddQArchonEl(null);
    }

    return (
        <>
            { rawEditorState !== null ?
                (<TextEditor onUpdate={(newEditorState) => onUpdate(newEditorState)} rawEditorState={rawEditorState} />)
                : (<></>)
            }
            <IconButton onClick={(e) => { openAddPopover(e) }}><AddCircleOutlineIcon className={classes.icon}/></IconButton>
            <Popover
                // id={id}
                open={Boolean(addQArchonEl)}
                anchorEl={addQArchonEl}
                onClose={() => closeAddPopover()}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    <ListItemButton onClick={() => { addNewQuestion(); closeAddPopover() }}>
                        <ListItemIcon>
                            <SortIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Paragraph
                        </ListItemText>
                    </ListItemButton>
                </List>
            </Popover>
            <IconButton onClick={() => { duplicateQuestion() }} ><ContentCopyIcon className={classes.icon}/></IconButton>
            <IconButton onClick={() => { deleteQuestion() }} ><DeleteForeverIcon  className={classes.icon}/></IconButton>
            <Divider sx={{ borderBottomWidth: 1}} className={classes.divider} />

        </>
    )
}

const useStyles = makeStyles({
    icon: {
        "color": "#E5E5E5",
        "&:hover": {
            "color": "blue",
        }
    },
    divider: {
        "background": "white"
    }
})

export default QuestionEdit;