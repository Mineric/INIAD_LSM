import { Divider, Popover } from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextEditor from "../../../../../../comps/text/TextEditor"
import Button from "@mui/material/Button"
import { useState } from "react"

// icon
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SortIcon from '@mui/icons-material/Sort';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const QuestionEdit = ({ rawEditorState, onUpdate, addNewQuestion, duplicateQuestion, deleteQuestion }) => {
    const [addQArchonEl, setAddQArchonEl] = useState(null);

    const openAddPopover = (event) => {
        setAddQArchonEl(event.currentTarget);
    }

    const closeAddPopover = () => {
        setAddQArchonEl(null);
    }

    return (
        <>
            <TextEditor onUpdate={(newEditorState) => onUpdate(newEditorState)} rawEditorState={rawEditorState} />
            <Button onClick={(e) => { openAddPopover(e) }}><AddCircleOutlineIcon /></Button>
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
            <Button onClick={() => { duplicateQuestion() }}><ContentCopyIcon /></Button>
            <Button onClick={() => { deleteQuestion() }}><DeleteForeverIcon /></Button>
            <Divider />

        </>
    )
}

export default QuestionEdit;