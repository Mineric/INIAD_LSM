import React, { useState, useEffect } from 'react';
import { convertToRaw, convertFromRaw, EditorState, AtomicBlockUtils } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic'
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
  )
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from  "./TextEditor.module.css"
import { red } from '@mui/material/colors';
import styleMap from './StyleMap';

// onUpdate: Update function to call everytime Editor State is updated
//      return: raw JSON of Editor State

const TextEditor = ({ onUpdate, rawEditorState}) => {
    const [editorState, setEditorState] = (() => {
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

    // DO NOT DELETE!!!
    // I forgot why I used it...
    // useEffect(() => {
    //     if(rawEditorState !== undefined && rawEditorState !== ""){
    //         setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditorState))))
    //     }    
            
    // }, [rawEditorState])
    
    
    const [uploadedImages, setUploadImages] = useState([]);  

    const  insertImage = (_editorState, base64) => {
        const contentState = _editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        { src: base64 },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
        _editorState,
        { currentContent: contentStateWithEntity },
        );
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    };

    const _uploadImageCallBack = (file) => {
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.

        // Make sure you have a uploadImages: [] as your default state
        
        let _uploadedImages = uploadedImages;

        const imageObject = {
        file: file,
        // file is a blob
        localSrc: URL.createObjectURL(file),
        }

        _uploadedImages.push(imageObject);

        setUploadImages([_uploadedImages]);

        // We need to return a promise with the image src
        // the img src we will use here will be what's needed
        // to preview it in the browser. This will be different than what
        // we will see in the index.md file we generate.
        return new Promise(
        (resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onloadend = function() {
            var base64data = reader.result;                
            console.log(base64data);
            // const newEditorState = insertImage(editorState, base64data);
            // console.log("Alert: " + JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            // setEditorState(newEditorState);
            resolve({ data: { link: base64data } });
            }
            
        }
        );
    };

    const handleEditorChange = (state) => {
        // const rawJson = JSON.stringify(convertToRaw(state.getCurrentContent()));
        setEditorState(state);
        onUpdate(JSON.stringify(convertToRaw(state.getCurrentContent())));
    }

    return (
        <div className="TextEditor">
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                customStyleMap={styleMap}
                wrapperClassName={styles.wrapperClass}
                editorClassName={styles.editorClass}
                toolbarClassName={styles.toolbarClass}
                toolbar={{
                    textAlign: { inDropdown: true },
                    image: {
                        uploadEnabled: true,
                        uploadCallback: _uploadImageCallBack,
                    }
                }}
                // toolbar={{
                //   inline: { inDropdown: true },
                //   list: { inDropdown: true },
                //   textAlign: { inDropdown: true },
                //   link: { inDropdown: true },
                //   history: { inDropdown: true },
                //   image: { uploadCallback: this._uploadImageCallBack },
                //   inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                // }}
            />
        </div>
    )
}

export default TextEditor;