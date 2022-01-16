import router from "next/router";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField"
import TextEditor from "../../../comps/text/TextEditor";
import TextDisplay from "../../../comps/text/TextDisplay"
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
    const [editable, setEditable] = useState();
    // Only editable if is owner of the profile
    const [isEditable, setIsEditable] = useState(false)
    const [information, setInformation] = useState({
        'profile_image': getAPIURL("/media/user/default.jfif")
    });
    /*
    UncommitInfo is the not-yet-updated-on-server information.
    It is used in edit mode, is cleared on closing edit mode.
    When updated, we update uncommitInfo and only update Information when we update on server.
    In another word: UncommitInfo = client-side information, information = server-side information 
    */
    const [uncommitInfo, setUncommitInfo] = useState({});
    const [tags, setTags] = useState([])
    const [suggestions, setSuggestions] = useState([]);
    const [currentSuggestions, setCurrentSuggestions] = useState([]);
    const [profileImage, setProfileImage] = useState(getAPIURL("/media/user/default.jfif"))
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const { userId } = router.query;
        if (!userId)
            return;
        else {
            const getURL = getAPIURL(`/viewset/profile/${userId}/`)
            fetchWrapper.get(getURL).then((data) => {
                if (data) {
                    console.log("Get data", information)
                    setInformation(data)
                    setTags(data.interest_tags.map(tag => { return { "id": tag, "text": tag } }))
                    setSuggestions(data.suggestions ? data.suggestions.map(tag => { return { "id": tag, "text": tag } }) : [])
                    setIsEditable(data.editable);
                    setProfileImage(data.profile_image);
                } else {
                    throw ("Get data unsuccessfully.")
                }
            }).then(() => {
                setEditable(false)
                setLoading(false)
            }).catch((e) => {
                alert(e)
            })
        }

    }, [userId])

    const UPDATEInformation = () => {
        const { userId } = router.query;
        const updateURL = getAPIURL(`/viewset/profile/${userId}/`)
        fetchWrapper.put(updateURL, { ...uncommitInfo, interest_tags: (tags.map(tag => tag.text)) }).then((data) => {
            if (data) {
                setInformation(data)
                setTags(data.interest_tags.map(tag => { return { "id": tag, "text": tag } }))
                setProfileImage(data.profile_image);
                setUncommitInfo({})
                changeEditMode();
            } else {
                console.log("Update information unsuccessfuly.")
            }
        })
    }

    const changeEditMode = () => {
        if (!editable && isEditable) {
            setEditable(true);
        }
        else if (editable) {
            setEditable(false);
            setUncommitInfo({})
        }

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
        static filterSuggestion(textInput, possibleSugegstionArray) {
            // we do not use possibleSugegstionArray because we want the already-selected is also suggested
            const nextSuggestions = suggestions.filter(suggestion => suggestion.text.toLowerCase().includes(textInput.toLowerCase()))
            setCurrentSuggestions(nextSuggestions)
            return nextSuggestions
        }
    }

    const onChangeInput = (event) => {
        const newInfo = { ...uncommitInfo }
        newInfo[event.target.id] = event.target.value
        setUncommitInfo(newInfo)
    }

    const updateDescription = (newDescriptionState) => {
        const newInfo = { ...uncommitInfo }
        newInfo.description = newDescriptionState;
        setUncommitInfo(newInfo)
    }

    /* Design Reference: https://www.pinterest.jp/pin/690317449128829116/ */
    return !loading && (
        <Grid container>
            <Grid item xs={12} className={styles.wrapperPage}>
                <Grid container>
                    {/* <Grid item xs={4}></Grid>
                    <Grid item xs={4}><h2 className={styles.title}>Profiles Settings</h2></Grid>
                    <Grid item xs={4}></Grid> */}
                    <Grid item xs={3}>
                        <Image className={styles.roundedImage} src={profileImage} width={300} height={300} />
                    </Grid>
                    <Grid item xs={9} className={styles.rightColumn}>
                        <Grid item xs={12} container>
                            {editable ?
                                <>
                                    <Grid item xs={5}>
                                        <TextField
                                            error={false}
                                            id="first_name"
                                            label="First Name"
                                            variant="standard"
                                            fullWidth
                                            value={uncommitInfo.first_name !== undefined ? uncommitInfo.first_name : information.first_name}
                                            onChange={(e) => onChangeInput(e)}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={1} />
                                    <Grid item xs={5}>
                                        <TextField
                                            error={false}
                                            id="last_name"
                                            label="Last Name"
                                            variant="standard"
                                            fullWidth
                                            value={uncommitInfo.last_name !== undefined ? uncommitInfo.last_name : information.last_name}
                                            onChange={(e) => onChangeInput(e)}
                                        ></TextField>
                                    </Grid>
                                </>
                                :
                                <>
                                    <Grid item xs={9}>
                                        <span className={`${styles.name}`}>{information.first_name}</span>
                                        <span className={styles.name}>{information.last_name}</span>
                                    </Grid>
                                    {
                                        isEditable ?
                                            <Grid item>
                                                <Button variant="outlined" onClick={() => changeEditMode()} className={styles.editButton}>Edit profile</Button>
                                            </Grid> : <></>
                                    }


                                </>
                            }

                        </Grid>
                        <Grid item xs={12}>
                            {editable ?
                                <TextField
                                    error={false}
                                    id="job"
                                    label="Job"
                                    variant="standard"
                                    fullWidth
                                    value={uncommitInfo.job !== undefined ? uncommitInfo.job : information.job}
                                    onChange={(e) => onChangeInput(e)}
                                ></TextField>
                                : <span className={styles.jobText}>{information.job ? information.job : "Nothing yet."}</span>
                            }
                        </Grid>
                        <Grid item xs={12} className={styles.tagsArea}>
                            {editable ?
                                <div>
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
                                        handleFilterSuggestions={tagsManager.filterSuggestion}
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
                                        suggestions={currentSuggestions ? currentSuggestions : suggestions}
                                        handleTagClick={(tagText) => {
                                            console.log(tagText)
                                            tagsManager.handleAdditionWText(tagText)
                                        }}
                                    />
                                </div>

                                : <TagsList
                                    classNames={{
                                        tagsList: `${styles.tagsList}`,
                                        tags: `${styles.tagBox}`,
                                        selectedBox: `${styles.selectedBox}`,
                                        unselectedBox: `${styles.unselectedBox}`,
                                    }}
                                    selectedTags={tags}
                                    suggestions={tags}
                                />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                {
                                    editable && !loading ?
                                        ( () => { return <>
                                            <div>
                                                <Typography>Description</Typography>
                                            </div>
                                            <TextEditor onUpdate={(newDescriptionState) => { updateDescription(newDescriptionState) }} rawEditorState={(uncommitInfo.description ? uncommitInfo.description : information.description)} />

                                        </>})() 
                                        : ( () => { console.log("When reach here", information.description); return <TextDisplay
                                            editorClassName={styles.textDisplayEditor}
                                            rawEditorState={information.description}></TextDisplay>})()
                                }

                            </div>
                        </Grid>
                        {editable ?
                            <Grid item xs={4}>
                                <Button variant="outlined" onClick={() => { UPDATEInformation() }}>Save</Button>
                            </Grid>
                            : <></>
                        }
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