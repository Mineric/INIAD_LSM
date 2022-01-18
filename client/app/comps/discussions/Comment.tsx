import React, { Component } from 'react'

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.commentBox = React.createRef();
    }

    componentDidMount() {
        let scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", "https://utteranc.es/client.js")
        scriptEl.setAttribute("crossorigin", "anonymous")
        scriptEl.setAttribute("async", true)
        scriptEl.setAttribute("repo", "Mineric/LSM_Comments.git")
        scriptEl.setAttribute("issue-term", "title")
        scriptEl.setAttribute("theme", "github-light")
        this.commentBox.current.appendChild(scriptEl)
    }

    render() {
        return (
            <div style={{ width: '100%', padding: '40px' }} id="comments">
                <div ref={this.commentBox}></div>
            </div>
        )
    }
}