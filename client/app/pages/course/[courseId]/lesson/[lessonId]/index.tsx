import React, { useState,  useEffect, Component } from 'react';
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
                    { id: 1, title: "Getting Started with Lorem Ipsum", text: `{"blocks":[{"key":"4r4b8","text":"Outline","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3jrqi","text":"This document is an overview of the git branch command and a discussion of the overall Git branching model.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":36,"length":11,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"d1hqs","text":"About branching","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cfkni","text":"Branching is a feature available in most modern version control systems. Branching in other VCS's can be an expensive operation in both time and disk space. In Git, branches are a part of your everyday development process. Git branches are effectively a pointer to a snapshot of your changes. When you want to add a new feature or fix a bug—no matter how big or how small—you spawn a new branch to encapsulate your changes. This makes it harder for unstable code to get merged into the main code base, and it gives you the chance to clean up your future's history before merging it into the main branch.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"770j0","text":"Branching - Visualization","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e2glv","text":"The graphic below depicts a repository with two separate development lines, one for a small feature and the other for a longer-running feature. It's not only possible to work on both of them in parallel while they're developed in branches, but it also keeps main branch clear of problematic code.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":258,"length":5,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}` },
                    { id: 2, title: "Getting Started with Lorem Ipsum", text: "" },
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
        if(!editable){
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
        setChanged((changed) => changed ? false: true)
    }
    const setCurrentDisplayContent = (index, tuncommitLesson={}) => {
        // Edit mode
        if(editable){
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
        const newLesson = {...uncommitLesson};
        const newPart = {...currentContent};
        newPart.text = rawEditorState;
        newLesson.content.splice(currentTab, 1, newPart);
        console.log("New lesson", newLesson);
        setUncommitLesson(newLesson);
        setCurrentDisplayContent(currentTab, newLesson);
    }

    return (
        <>
            <Layout pageTitle="Realtime Comments">

                <main className="container-fluid position-absolute h-100 bg-white">
                    <div className="row position-absolute w-100 h-100">

                        <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center border-right border-gray px-0">
                            <Button onClick={(e) => changeEditMode()}>{editable ? "Save" : "Edit"}</Button>
                            {lessonState && <div className="position-relative h-100">

                                <div className='lessonTab'>
                                    <LessonTab
                                        tabList={lessonState.content}
                                        className="tab"
                                        allowAddTab={editable}
                                        currentTab={currentTab}
                                        onAddTab={() => { addTab() }}
                                        onClickTab={(index) => { onClickTab(index) }} />
                                </div>

                                <div className={useStyles.slide}>

                                    <div className="px-5 mt-5 pt-5 mx-5 ">
                                        <span className="d-block px-5 mx-5 pt-5 h5 text-uppercase text-primary font-weight-bold mb-3">Lesson-{lessonsIndex}.{currentTab + 1}</span>
                                        <span className="d-block px-5 mx-5 pb-5 h1 text-dark border-bottom border-gray">{currentContentTitle}</span>
                                    </div>

                                    <div className="d-block h-50 px-5 mt-5 pt-3 mx-5 position-relative" style={{ overflowY: 'auto' }}>
                                        <span className="d-block px-5 mx-5 text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>
                                            {/* <Markdown editable={editable}>{"Just a code: `git add .`"}</Markdown> */}
                                            {!editable && 
                                                <TextDisplay key={'D' + currentTab} rawEditorState={currentContentText}></TextDisplay> }
                                            {editable &&    
                                                <TextEditor key={'E' + currentTab} rawEditorState={currentContentText} onUpdate={(rawEditorState) => updateLessonText(rawEditorState)}></TextEditor>
                                            }
                                        </span>
                                    </div>

                                    <div>
                                        <Image
                                            loader={myLoader}
                                            src="me.png"
                                            alt="Picture of the author"
                                            width={500}
                                            height={500}
                                        />
                                    </div>

                                </div>
                            </div>}

                        </section>

                        {/* <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-light px-0"> */}
                        {/* { <LessonProgressBar value={32} />} */}
                        {/* {<Comments />}
                        </section> */}

                    </div>
                </main>



            </Layout>
        </>
    );


};

export default lecture;