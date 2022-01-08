import router from "next/router";
import { useState } from "react";
import TextField from "@mui/material/TextField"
import TextEditor from "../../../comps/text/TextEditor";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid"

const ProfilePage = () => {
    const { userId } = router.query;
    const [editable, setEditable] = useState(true);
    const [information, setInformation] = useState({});

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
            <Grid item xs={4}>Biography</Grid>
            <Grid item xs={8}>
                {editable ?
                    <TextEditor onUpdate={() => { }} rawEditorState={""} />
                    : <></>
                }
            </Grid>
        </Grid>
    )
}

export default ProfilePage;