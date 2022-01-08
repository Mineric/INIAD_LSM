import React, { Component } from 'react';
import axios from 'axios';
import DiscussionLayout from '../comps/discussions/DiscussionLayout';
import CommentsWidget from '../comps/discussions/CommentsWidget';

class discussions extends Component {

	state = { post: null }

	componentDidMount() {
		axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
			.then(response => this.setState({ post: response.data }));
	}

  render() {
    return (
      <DiscussionLayout pageTitle="Realtime Comments">
        <main className="container-fluid position-absolute h-100 bg-white">
          <div className="row position-absolute w-100 h-100">

            <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-light px-0">
				{ this.state.post && <CommentsWidget /> }
			</section>

          </div>
        </main>
      </DiscussionLayout>
    );
  }

};

export default discussions;