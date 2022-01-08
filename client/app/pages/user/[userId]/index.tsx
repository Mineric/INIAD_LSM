import router from "next/router";
import { useState } from "react";
import TextField from "@mui/material/TextField"
import TextEditor from "../../../comps/text/TextEditor";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid"
import { WithContext as ReactTags } from "react-tag-input";
import TagsList from "../../../comps/tags/TagsList";

const interest_tags = [{ "id": "Math", "text": "Math" }, { "id": "Physics", "text": "Physics" }]
const suggestions = [{ "id": "Math", "text": "Math" }, { "id": "Physics", "text": "Physics" }, { "id": "Geo", "text": "Geography" }]
const Keys = {
    TAB: 9,
    SPACE: 32,
    COMMA: 188,
};

const ProfilePage = () => {
    const { userId } = router.query;
    const [editable, setEditable] = useState(true);
    const [information, setInformation] = useState({});
    const [tags, setTags] = useState(interest_tags)
    const tagsComp = {
        "handleDelete": (i) => {
            setTags(tags.filter((tag, index) => index !== i))
        },
        "handleAddition": (tag) => {
            setTags([...tags, tag])
        },
        "handleAdditionWText": (tagText) => {
            const tag = {"id": tagText, "text": tagText}
            setTags([...tags, tag])
        },
    }
    return (
        <Grid container>
            <Grid item xs={4}>First Name</Grid>
            <Grid item xs={8}>
                {editable ?
                    <TextField
                        error={false}
                        id="first-name"
                        label="First Name"
                    ></TextField>
                    : <></>
                }
            </Grid>
            <Grid item xs={4}>Last Name</Grid>
            <Grid item xs={8}>
                {editable ?
                    <TextField
                        error={false}
                        id="last-name"
                        label="Last Name"
                    ></TextField>
                    : <></>
                }
            </Grid>
            <Grid item xs={4}>Job</Grid>
            <Grid item xs={8}>
                {editable ?
                    <TextField
                        error={false}
                        id="job"
                        label="Job"
                    ></TextField>
                    : <></>
                }
            </Grid>
            <Grid item xs={4}>Description</Grid>
            <Grid item xs={8}>
                {editable ?
                    <TextEditor onUpdate={() => { }} rawEditorState={""} />
                    : <></>
                }
            </Grid>
            <Grid item xs={4}>Tags</Grid>
            <Grid item xs={8}>
                {editable ?
                    <>
                        <ReactTags inline
                            allowDragDrop={false}
                            autoComplete={true}
                            tags={tags}
                            handleDelete={tagsComp.handleDelete}
                            handleAddition={tagsComp.handleAddition}
                            handleTagClick={tagsComp.handleDelete}
                            suggestions={suggestions}
                            delimiters={[Keys.TAB, Keys.SPACE, Keys.COMMA]}
                            placeholder={"Add a new interest"}
                            removeComponent={(index) => (<></>)} /* Remove the x button */
                        />
                        <TagsList 
                            selectedTags={tags} 
                            suggestions={suggestions} 
                            handleTagClick={(tagText) => {
                                console.log(tagText)
                                tagsComp.handleAdditionWText(tagText)
                            }}
                        />
                    </>

                    : <ReactTags inline
                        tags={tags}
                        suggestions={suggestions}
                        readOnly={true} /* Remove the x button */
                    />
                }
            </Grid>
        </Grid>
    )
}

export default ProfilePage;