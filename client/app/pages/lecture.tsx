import React, { Component } from 'react';
import axios from 'axios';
import Layout from '../comps/discussions/DiscussionLayout';
import CommentsWidget from '../comps/discussions/CommentsWidget';
import CourseSkeleton from '../comps/CourseSkeleton';
import Image from 'next/image';
import LessonTab from '../comps/lecture/LessonTab';
import LessonProgressBar from '../comps/lecture/LessonProgress';
import { StylesContext } from '@mui/styles';
import Comments from '../comps/discussions/Comment';
import { makeStyles } from "@material-ui/core/styles";
import Markdown from '../comps/Markdown';
// export const getStaticProps = async () => {
//   const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
//   const data = await res.text();

//   return {
//     props: {lessons: data}
//   }

  
// }

const useStyles = makeStyles((theme) => ({

  slide: {
    "color" : red,
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

export const getStaticProps = async () => {
  const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
  const data = await res.text();

  return {
    props: {lessons: "Pariatur meatball kielbasa, tenderloin beef frankfurter dolore brisket minim pork loin pork hamburger. Fugiat alcatra sint, minim turkey ham hock labore consectetur biltong veniam reprehenderit. Filet mignon pig nulla, commodo doner qui voluptate irure ullamco enim short ribs. Nostrud culpa officia dolor adipisicing sed kielbasa ea irure ham sirloin rump meatloaf commodo short loin. Dolore leberkas duis, non pancetta proident swine in cupidatat lorem ea id boudin t-bone nisi."}
  }
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

const lecture = ({lessons}) =>  {

	// state = { post: null }

	// componentDidMount() {
	// 	axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
	// 		.then(response => this.setState({ post: response.data }));
	// }



    return (
      <>
        <Layout pageTitle="Realtime Comments">

          <main className="container-fluid position-absolute h-100 bg-white">
            <div className="row position-absolute w-100 h-100">

              <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center border-right border-gray px-0">
                    { lessons &&  <div className="position-relative h-100">

                    <div className='lessonTab'>
                      <LessonTab className="tab"/>
                    </div>

                    <div className={useStyles.slide}>

                      <div className="px-5 mt-5 pt-5 mx-5 ">
                        <span className="d-block px-5 mx-5 pt-5 h5 text-uppercase text-primary font-weight-bold mb-3">Lesson-01</span>
                        <span className="d-block px-5 mx-5 pb-5 h1 text-dark border-bottom border-gray">Getting Started with Lorem Ipsum</span>
                      </div>
                  
                      <div className="d-block h-50 px-5 mt-5 pt-3 mx-5 position-relative" >
                        <span className="d-block px-5 mx-5 text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>{ lessons }</span>
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
                  </div> }

              </section>

              <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-light px-0">
                {/* { <LessonProgressBar value={32} />} */}
                {<Comments/> }
              </section>

            </div>
          </main>

       

        </Layout>
      </>
    );


};

export default lecture;