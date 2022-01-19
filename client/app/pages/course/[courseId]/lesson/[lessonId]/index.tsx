import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Layout from '../../../../../comps/discussions/DiscussionLayout';
import CommentsWidget from '../../../../../comps/discussions/CommentsWidget';
import CourseSkeleton from '../../../../../comps/CourseSkeleton';
import Image from 'next/image';
import LessonTab from '../../../../../comps/lecture/LessonTab';
import LessonProgressBar from '../../../../../comps/lecture/LessonProgress';
import { StylesContext } from '@mui/styles';
import Comments from '../../../../../comps/discussions/Comment';
import { makeStyles } from "@material-ui/core/styles";
import Markdown from "../../../../../comps/Markdown"
import TextEditor from '../../../../../comps/text/TextEditor';
import TextDisplay from '../../../../../comps/text/TextDisplay';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

const useStyles = makeStyles((theme) => ({

    slide: {
        "color": red,
        "&:hover": {
            color: theme.palette.info.main,
        },
    },
}));

export const getStaticProps = async () => {
    const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
    const data = await res.text();

    return {
        props: {
            lessons: {
                index: "1",
                content: [
                    { id: 1, title: "Git Branch", text: `{"blocks":[{"key":"4r4b8","text":"Outline","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3jrqi","text":"This document is an overview of the git branch command and a discussion of the overall Git branching model.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":36,"length":11,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"d1hqs","text":"About branching","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cfkni","text":"Branching is a feature available in most modern version control systems. Branching in other VCS's can be an expensive operation in both time and disk space. In Git, branches are a part of your everyday development process. Git branches are effectively a pointer to a snapshot of your changes. When you want to add a new feature or fix a bug—no matter how big or how small—you spawn a new branch to encapsulate your changes. This makes it harder for unstable code to get merged into the main code base, and it gives you the chance to clean up your future's history before merging it into the main branch.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"770j0","text":"Branching - Visualization","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e2glv","text":"The graphic below depicts a repository with two separate development lines, one for a small feature and the other for a longer-running feature. It's not only possible to work on both of them in parallel while they're developed in branches, but it also keeps main branch clear of problematic code.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":258,"length":5,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}` },
                    { id: 2, title: "How it works", text: `{"blocks":[{"key":"a7he2","text":"What a Branch represents","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9dc7a","text":"A branch represents an independent line of development. Branches serve as an abstraction for the edit/stage/commit process. You can think of them as a way to request a brand new working directory, staging area, and project history. New commits are recorded in the history for the current branch, which results in a fork in the history of the project.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":2,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"761i3","text":"Common Options","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b6arh","text":"git branch List all of the branches in your repository. This is synonymous with git branch --list.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"CODE"},{"offset":80,"length":17,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"5el46","text":" git branch <branch>  Create a new branch called ＜branch＞. This does not check out the new branch.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":1,"length":20,"style":"CODE"},{"offset":49,"length":8,"style":"CODE"},{"offset":69,"length":4,"style":"BOLD"},{"offset":69,"length":4,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"afv6k","text":"git branch -d <branch> Delete the specified branch. This is a “safe” operation in that Git prevents you from deleting the branch if it has unmerged changes.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"1mjn1","text":"git branch -D <branch> Force delete the specified branch, even if it has unmerged changes. This is the command to use if you want to permanently throw away all of the commits associated with a particular line of development.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"92lkk","text":"git branch -m <branch> Rename the current branch to ＜branch＞.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"CODE"},{"offset":52,"length":8,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"ds04k","text":"git branch -a List all remote branches.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}` },
                    { id: 3, title: "Remote Branch: Creating and Deleting", text: `{"blocks":[{"key":"1kmdo","text":"Creating remote branches","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ai5ib","text":" So far these examples have all demonstrated local branch operations. The git branch command also works on remote branches. In order to operate on remote branches, a remote repo must first be configured and added to the local repo config.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":74,"length":10,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"7tjhn","text":"        $ git remote add new-remote-repo https://bitbucket.com/user/repo.git","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":8,"length":68,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"c3ues","text":"        # Add remote repo to local repo config","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":46,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"28q55","text":"        $ git push <new-remote-repo> crazy-experiment~","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":54,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"b0q8q","text":"        # pushes the crazy-experiment branch to new-remote-repo","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":63,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"c4jnq","text":"This command will push a copy of the local branch crazy-experiment to the remote repo ＜remote＞.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":50,"length":16,"style":"CODE"},{"offset":86,"length":8,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"5fs7c","text":"Deleting Branches","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"acn6m","text":"Once you’ve finished working on a branch and have merged it into the main code base, you’re free to delete the branch without losing any history:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6lnv0","text":"git branch -d crazy-experiment","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":30,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"fjkap","text":"However, if the branch hasn’t been merged, the above command will output an error message:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1egl9","text":"error: The branch 'crazy-experiment' is not fully merged. If you are sure you want to delete it, run 'git branch -D crazy-experiment'.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":134,"style":"CODE"},{"offset":0,"length":5,"style":"color-rgb(209,72,65)"},{"offset":7,"length":127,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}},{"key":"818nc","text":"This protects you from losing access to that entire line of development. If you really want to delete the branch (e.g., it’s a failed experiment), you can use the capital -D flag:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":171,"length":2,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"cd6t9","text":"git branch -D crazy-experiment","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":30,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"32l20","text":"This deletes the branch regardless of its status and without warnings, so use it judiciously.  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"279jd","text":"        The previous commands will delete a local copy of a branch. The branch may still exist in remote repos. To delete a remote branch execute the following.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ajbq2","text":"git push origin --delete crazy-experiment","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":41,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"f8r6n","text":"This will push a delete signal to the remote origin repository that triggers a delete of the remote crazy-experiment branch.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":100,"length":16,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}` }
                ]
            }
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { courseId: '1', lessonId: '1' } } // See the "paths" section below
        ],
        fallback: true //, false or "blocking" // See the "fallback" section below
    };
}

const myLoader = ({ src, width, quality }) => {
    return `https://wac-cdn.atlassian.com/dam/jcr:a13c18d6-94f3-4fc4-84fb-2b8f1b2fd339/01%20How%20it%20works.svg?cdnVersion=167`
}

// const lecture = ({lessons}) => {
//   return(
//     <div>
//       { lessons}
//     </div>
//   )
// }

/*
    lessons: 
    {
        index: "1",
        content: [
            {id: 1, text: ""}, {id: 2, text: ""}
        ]
    }
*/

const lecture = ({ lessons }) => {
    const lessonsIndex = lessons.index;
    const [editable, setEditable] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [currentContent, setCurrentContent] = useState({});
    const [currentContentTitle, setCurrentContentTitle] = useState("");
    const [currentContentText, setCurrentContentText] = useState("");
    // for changes that we might or might not save
    const [lessonState, setLessonState] = useState(lessons);
    const [uncommitLesson, setUncommitLesson] = useState(lessons);
    const [changed, setChanged] = useState(true);

    useEffect(() => {
        const tab = lessons.content.length > 0 ? 0 : -1;
        setCurrentTab(tab);
        setCurrentDisplayContent(tab);
        setLessonState(lessons);
    }, [])

    const changeEditMode = () => {
        setEditable(editable ? false : true);
    }

    const onClickEditBtn = () => {
        if (!editable) {
            setUncommitLesson(lessonState);
        } else {
            setLessonState(uncommitLesson);
        }
        changeEditMode();
    }

    const addTab = () => {
        const newUncommitLesson = { ...uncommitLesson }
        newUncommitLesson.content.push({
            title: "",
            text: "",
        })
        setCurrentTab(newUncommitLesson.content.length - 1);
        setCurrentDisplayContent(newUncommitLesson.content.length - 1, newUncommitLesson);
        setUncommitLesson(newUncommitLesson);
    }
    const onClickTab = (index) => {
        setCurrentTab(index);
        setCurrentDisplayContent(index, uncommitLesson);
        setChanged((changed) => changed ? false : true)
    }
    const setCurrentDisplayContent = (index, tuncommitLesson = {}) => {
        // Edit mode
        if (editable) {
            setCurrentContent(tuncommitLesson.content[index]);
            setCurrentContentTitle(tuncommitLesson.content[index].title)
            setCurrentContentText(tuncommitLesson.content[index].text)
        } else {
            setCurrentContent(lessonState.content[index]);
            setCurrentContentTitle(lessonState.content[index].title)
            setCurrentContentText(lessonState.content[index].text)
        }
    }
    const updateLessonText = (rawEditorState) => {
        const newLesson = { ...uncommitLesson };
        const newPart = { ...currentContent };
        newPart.text = rawEditorState;
        newLesson.content.splice(currentTab, 1, newPart);
        console.log("New lesson", newLesson);
        setUncommitLesson(newLesson);
        setCurrentDisplayContent(currentTab, newLesson);
    }

    return (
        <>
            <Layout pageTitle="Realtime Comments" >

                <Box className="bg-white lesson-page">
                    <Grid container>
                        <Grid item container md={9} xs={8}>
                            <Grid item md={4} xs={4}></Grid>
                            <Grid item md={4} xs={3}>
                                <LessonTab
                                    tabList={lessonState.content}
                                    allowAddTab={editable}
                                    currentTab={currentTab}
                                    onAddTab={() => { addTab() }}
                                    onClickTab={(index) => { onClickTab(index) }} />
                            </Grid>
                            <Grid item md={2} xs={3}></Grid>
                            <Grid item md={2} xs={2}>
                                <Button onClick={(e) => changeEditMode()}>{editable ? "Save" : "Edit"}</Button>
                            </Grid>
                            <Grid item md={2} xs={2}></Grid>
                            <Grid item md={8} xs={8}>
                                <div>
                                    <span className="d-block h5 text-uppercase text-primary font-weight-bold mb-3">Lesson-{lessonsIndex}.{currentTab + 1}</span>
                                    <span className="d-block h1 text-dark border-bottom border-gray">{currentContentTitle}</span>
                                </div>
                                <div className={useStyles.slide}>
                                    <span className="text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>
                                        {/* <Markdown editable={editable}>{"Just a code: `git add .`"}</Markdown> */}
                                        {!editable &&
                                            <TextDisplay key={'D' + currentTab} rawEditorState={currentContentText}></TextDisplay>}
                                        {editable &&
                                            <TextEditor key={'E' + currentTab} rawEditorState={currentContentText} onUpdate={(rawEditorState) => updateLessonText(rawEditorState)}></TextEditor>
                                        }
                                    </span>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item container md={3} xs={4}>
                            {/* <LessonProgressBar value={32} /> ? */}
                            <Comments /> 
                        </Grid>
                        {/* <section className="col-md-8 col-xs-8 d-flex flex-row flex-wrap align-items-center align-content-center border-right border-gray px-0"> */}
                    </Grid>
                </Box>

                {/* <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-light px-0"> */}
                {/* 
                        </section> */}
            </Layout >
        </>
    );


};

export default lecture;