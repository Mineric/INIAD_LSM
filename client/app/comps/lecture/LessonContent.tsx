import React, { Component } from 'react';
import axios from 'axios';
// import Layout from '../comps/discussions/DiscussionLayout';
// import CommentsWidget from '../comps/discussions/CommentsWidget';
// import CourseSkeleton from '../comps/CourseSkeleton';
import Image from 'next/image';

const LessonContent extends Component {

    state = { post: null }

    componentDidMount() {
      axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
        .then(response => this.setState({ post: response.data }));
    }

    return (
      <div className='lecture-card'>
        <div className="px-5 mt-5 pt-5 mx-5 ">
          <span className="d-block px-5 mx-5 pt-5 h5 text-uppercase text-primary font-weight-bold mb-3">Lesson-01</span>
          <span className="d-block px-5 mx-5 pb-5 h1 text-dark border-bottom border-gray">Getting Started with Lorem Ipsum</span>
        </div>
      
        <div className="d-block h-50 px-5 mt-5 pt-3 mx-5 position-relative" style={{ overflowY: 'auto' }}>
          <span className="d-block px-5 mx-5 text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>{ lessons }</span>
        </div>
      </div>
    ) 
}


export default LessonContent;