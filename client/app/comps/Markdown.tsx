import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
// import "@uiw/react-markdown-preview/esm/styles/markdown.css"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Grid from "@mui/material/Grid"

const Markdown = ({ children, editable = false }) => {
    const [markdownState, setMarkdownState] = useState(children);
    const onTextareaChange = (e) => {
        const value = e.target.value;
        setMarkdownState(value);
    }
    return (
        <Grid container>
            {!editable && <ReactMarkdown children={markdownState} remarkPlugins={[remarkGfm]} />}
            {editable && <>
                <Grid item xs={6}>
                    <TextareaAutosize value={markdownState} onChange={(e) => onTextareaChange(e)} />
                </Grid>
                <Grid item xs={6}>
                    <ReactMarkdown children={markdownState} remarkPlugins={[remarkGfm]} />
                </Grid>
            </>}
        </Grid>
    )
}

export default Markdown;