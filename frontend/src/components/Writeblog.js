import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js';	
import draftToHtml from 'draftjs-to-html';
import {BlogContext} from '../store/BlogContext'




//  console.log(getHtml)
const Writeblog = ()=>{
  const [appState, setAppState] = useContext(BlogContext)
  const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()))

  
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [blog_pic, setBlog_pic] = useState("")
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [smsg, setSmsg] = useState("")
  const [emsg, setEmsg] = useState("")
  

 

  const onEditorStateChange = editorState => {
    setEditorState(editorState);	
    };

  const handleFormSubmit = (e) => {
      e.preventDefault();
      let form_data = new FormData();
      form_data.append("title", title);
      form_data.append("category", category);
      form_data.append("content", getHtml(editorState));
      form_data.append("author", appState.uid);
      form_data.append("blog_pic", blog_pic, blog_pic.name);
      console.log(form_data)
      let url = `http://127.0.0.1:8000/api/create/`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          //console.log(res.data);
          setSmsg("Blog Posted Successfully")
       setTimeout(()=>{setSmsg("")},4000)
        })
        .catch((err) =>{
         //console.log(err));
         setEmsg("Something went wrong")
         setTimeout(()=>{setEmsg("")},4000)
        })
  }
  
    return (
      <div className="container">
        <h3 style={{backgroundColor:'green',color:'white',textAlign:'center'}}>{smsg}</h3>
        <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{emsg}</h3>
        <h3>Write Blog </h3>
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <label>Select Blog Image:</label>
                <input type="file" onChange={(e)=>setBlog_pic(e.target.files[0])} />
              </div>
            </div>
            <div className="col-7">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Blog Title"
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-2">
              <div className="form-group">
                <label>Choose Category:</label>
                <select
                  className="form-control-sm"
                  onChange={(e)=>setCategory(e.target.value)}
                >
                  <option>Select Category</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Education">Education</option>
                  <option value="Science">Science</option>
                  <option value="Economics">Economics</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Travel">Travel</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
<div className="col-12">
<Editor	
// editorState={editorState}
wrapperClassName="rich-editor demo-wrapper"	   
editorClassName="demo-editor"	
onEditorStateChange={onEditorStateChange}	  
placeholder="Blog content goes here..."	       
/>
</div>
<br></br>
<br></br>

<form onSubmit={(e)=>handleFormSubmit(e)}>

<button type="submit" className="btn btn-primary pull-right" style={{float:"right"}}> Submit</button>

</form>


         
        <br />
        <hr></hr>
      </div>
    );
  }


export default Writeblog;
