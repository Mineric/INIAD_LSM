import React, { useState, useContext } from 'react';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import dynamic from 'next/dynamic'
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
  )
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Link from "next/link";
import styles from "./TextDisplay.module.css"

const DisplayEditor = ({rawEditorState}) => {
//   const contentState = `{"blocks":[{"key":"5oocd","text":"hi","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2lb8m","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4b6eo","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"7nqko","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"blob:http://localhost:3000/01d9c418-8806-477d-99c3-408f664505fe","height":"auto","width":"auto"}}}}`
//   const displayEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(contentState)));
    const [displayEditorState, setDisplayEditorState] = (() => {
      if(rawEditorState !== undefined && rawEditorState !== ""){
          return useState(
              EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditorState)))
          )
      } else{
          return useState(
              () => EditorState.createEmpty(),
          )
      }
  })()
  return (
    <>
      {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
      <Editor editorState={displayEditorState}
        // wrapperClassName={styles.wrapperClass}
        editorClassName={styles.editorClass}
        toolbarClassName={styles.toolbarClass}
        
        toolbarHidden={true}
        readOnly={true}
      />
    </>
  )
}
export default DisplayEditor;
