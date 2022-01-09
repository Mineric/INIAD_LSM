import router from "next/router";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField"
import TextEditor from "../../../comps/text/TextEditor";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid"
import { WithContext as ReactTags } from "react-tag-input";
import TagsList from "../../../comps/tags/TagsList";
import Image from 'next/image'
import TagBox from "../../../comps/tags/TagBox";
import styles from "./index.module.css"
import { fetchWrapper, getAPIURL } from "../../../helpers";
import Button from "@mui/material/Button"
import { setIn } from "immutable";

const interest_tags = [{ "id": "Math", "text": "Math" }, { "id": "Physics", "text": "Physics" }]
const suggestions = [{ "id": "Math", "text": "Math" }, { "id": "Physics", "text": "Physics" }, { "id": "Geo", "text": "Geography" }, { "id": "Geopy", "text": "Geopardy" }]
const Keys = {
    TAB: 9,
    SPACE: 32,
    COMMA: 188,
};

const ProfilePage = () => {
    const { userId } = router.query;
    const [editable, setEditable] = useState(true);
    const [information, setInformation] = useState({
        'profile_image': getAPIURL("/media/user/default.jfif")
    });
    const [tags, setTags] = useState([])
    const [suggestions, setSuggestions] = useState([]); 
    useEffect(() => {
        const getURL = getAPIURL(`/viewset/profile/${userId}/`)
        fetchWrapper.get(getURL).then((data) => {
            if(data){
                console.log("Get data", data)
                setInformation(data)
                setTags(data.interest_tags.map(tag => {return {"id": tag, "text": tag}}))
                setSuggestions(data.suggestions.map(tag => {return {"id": tag, "text": tag}}))
            }
        })
    }, [])

    const UPDATEInformation = () => {
        const updateURL = getAPIURL(`/viewset/profile/${userId}/`)
        fetchWrapper.put(updateURL, {...information, tags: (tags.map(tag => tag.text))}).then((data) => {
            if(data){
                setInformation(data)
            } else{
                console.log("Update information unsuccessfuly.")
            }
        })
    }

    let tagsManager = class {
        static handleDelete(i) {
            setTags(tags.filter((tag, index) => index !== i))
        }
        static handleAddition(tag) {
            setTags([...tags, tag])
        }
        static handleAdditionWText(tagText) {
            const tag = { "id": tagText, "text": tagText }
            setTags([...tags, tag])
        }
        static renderSuggestion({ text }, query) {
            return <TagBox
                text={text}
                selected={(tags.find(tag => tag.text === text) !== undefined)}
                handleTagClick={() => { this.handleAdditionWText(text) }} />
        }
    }

    const onChangeInput = (event) => {
        const newInfo = {...information}
        newInfo[event.target.id] = event.target.value
        setInformation(newInfo)
    }

    const updateDescription = (newDescriptionState) => {
        const newInfo = {...information}
        newInfo.description = newDescriptionState;
        setInformation(newInfo)
    }

    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8} className={styles.wrapperPage}>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}><h2 className={styles.title}>Profiles Settings</h2></Grid>
                    <Grid item xs={4}></Grid>
                    <Row leftColumn={"Profile image"}>
                        <Grid container>
                            <Grid item xs={2} />
                            <Grid item xs={8}>
                                <Image className={styles.roundedImage} src={information.profile_image} width={300} height={300} />
                            </Grid>
                        </Grid>
                    </Row>
                    <Row leftColumn={"First name"}>
                        {editable ?
                            <TextField
                                error={false}
                                id="first_name"
                                label="First Name"
                                value={information.first_name}
                                onChange={(e) => onChangeInput(e)}
                            ></TextField>
                            : <></>
                        }
                    </Row>
                    <Row leftColumn={"Last Name"}>
                        {editable ?
                            <TextField
                                error={false}
                                id="last_name"
                                label="Last Name"
                                value={information.last_name}
                                onChange={(e) => onChangeInput(e)}
                            ></TextField>
                            : <></>
                        }
                    </Row>
                    <Row leftColumn={"Job"}>
                        {editable ?
                            <TextField
                                error={false}
                                id="job"
                                label="Job"
                                value={information.job}
                                onChange={(e) => onChangeInput(e)}
                            ></TextField>
                            : <></>
                        }
                    </Row>
                    <Row leftColumn={"Description"}>
                        {editable ?
                            <TextEditor onUpdate={(newDescriptionState) => {updateDescription(newDescriptionState)}} rawEditorState={information.description} />
                            : <></>
                        }
                    </Row>
                    <Row leftColumn={"Interests"}>
                        {editable ?
                            <div >
                                <ReactTags
                                    classNames={{
                                        tag: `${styles.tagBox} ${styles.selectedBox}`,
                                        tagInput: 'tagInputClass',
                                        tagInputField: `${styles.tagInputField}`,
                                        remove: 'removeClass',
                                        suggestions: `${styles.ReactTags__suggestions}`,
                                        activeSuggestion: 'activeSuggestionClass'
                                    }}
                                    inline
                                    allowDragDrop={false}
                                    autoComplete={true}
                                    tags={tags}
                                    handleDelete={tagsManager.handleDelete}
                                    handleAddition={tagsManager.handleAddition}
                                    handleTagClick={tagsManager.handleDelete}
                                    handleInputFocus={() => { }}
                                    renderSuggestion={tagsManager.renderSuggestion}
                                    suggestions={suggestions}
                                    delimiters={[Keys.TAB, Keys.SPACE, Keys.COMMA]}
                                    placeholder={"Add a new interest"}
                                    removeComponent={(index) => (<></>)} /* Remove the x button */
                                />
                                <TagsList
                                    classNames={{
                                        tagsList: `${styles.tagsList}`,
                                        tags: `${styles.tagBox}`,
                                        selectedBox: `${styles.selectedBox}`,
                                        unselectedBox: `${styles.unselectedBox}`,
                                    }}
                                    selectedTags={tags}
                                    suggestions={suggestions}
                                    handleTagClick={(tagText) => {
                                        console.log(tagText)
                                        tagsManager.handleAdditionWText(tagText)
                                    }}
                                />
                            </div>

                            : <ReactTags inline
                                tags={tags}
                                suggestions={suggestions}
                                readOnly={true} /* Remove the x button */
                            />
                        }
                    </Row>
                    <Grid item xs={8} />
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={() => {UPDATEInformation()}}>UPDATE</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>


    )
}

const Row = ({ leftColumn, children }) => {
    return (<Grid container className={styles.row}>
        <Grid item xs={4}>{leftColumn}</Grid>
        <Grid item xs={8}>{children}</Grid>
    </Grid>)
}

export default ProfilePage;