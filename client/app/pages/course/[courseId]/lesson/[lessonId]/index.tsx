import React, { useState, Component } from 'react';
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
                    { id: 1, title: "Getting Started with Lorem Ipsum", text: data },
                    { id: 2, title: "Getting Started with Lorem Ipsum", text: data },
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
    const [editable, setEditable] = useState(true);
    const [currentTab, setCurrentTab] = useState(lessons.length > 0 ? 0 : -1);
    const [currentContent, setCurrentContent] = useState({});
    const [uncommitLesson, setUncommitLesson] = useState(lessons);
    const changeEditMode = () => {
        setEditable(editable ? false : true);
    }

    const addTab = () => {
        const newUncommitLesson = { ...uncommitLesson }
        newUncommitLesson.content.push({
            title: "",
            text: "",
        })
        setCurrentTab(newUncommitLesson.content.length - 1);
        setCurrentContent(newUncommitLesson.content);
        setUncommitLesson(newUncommitLesson);
    }
    const onClickTab = (index) => {
        setCurrentTab(index);
        setCurrentContent(lessons.content[index]);
    }

    return (
        <>
            <Layout pageTitle="Realtime Comments">

                <main className="container-fluid position-absolute h-100 bg-white">
                    <div className="row position-absolute w-100 h-100">

                        <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center border-right border-gray px-0">
                            {lessons && <div className="position-relative h-100">

                                <div className='lessonTab'>
                                    <LessonTab
                                        tabList={lessons.content}
                                        className="tab"
                                        allowAddTab={editable}
                                        currentTab={currentTab}
                                        onAddTab={() => { addTab() }}
                                        onClickTab={(index) => { onClickTab(index) }} />
                                </div>

                                <div className={useStyles.slide}>

                                    <div className="px-5 mt-5 pt-5 mx-5 ">
                                        <span className="d-block px-5 mx-5 pt-5 h5 text-uppercase text-primary font-weight-bold mb-3">Lesson-{lessonsIndex}.{currentTab + 1}</span>
                                        <span className="d-block px-5 mx-5 pb-5 h1 text-dark border-bottom border-gray">{currentContent.title}</span>
                                    </div>

                                    <div className="d-block h-50 px-5 mt-5 pt-3 mx-5 position-relative" style={{ overflowY: 'auto' }}>
                                        <span className="d-block px-5 mx-5 text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>
                                            <Markdown editable={editable}>{"Just a code: `git add .`"}</Markdown>
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