import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js';	
import draftToHtml from 'draftjs-to-html';
import { PreviewModal } from './PreviewModal';



const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));
 console.log(getHtml)
class Writeblog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      content: "",
      author: "",
      file: null,
      blog_pic: "",
      editorState: EditorState.createEmpty(),
    };
  }

  imageChange = (event) => {
    this.setState({
      blog_pic: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  titleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  categoryChange = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  onEditorStateChange = editorState => {
    this.setState({editorState});	
    };

  handleFormSubmit = (event) => {
    if (this.props.logged_in !== true) {
      alert("You are not Logged-In");
      // window.location.href = "http://localhost:3000/login"
      // const { history } = this.props.history;
      // history.push("/login")
    } else {
      event.preventDefault();
      let form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("category", this.state.category);
      form_data.append("content", getHtml(this.state.editorState));
      form_data.append("author", this.props.user_id);
      form_data.append(
        "blog_pic",
        this.state.blog_pic,
        this.state.blog_pic.name
      );
      let url = `http://127.0.0.1:8000/api/create/`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          alert("Blog Posted Successfully");
        })
        .catch((err) => console.log(err));
    }
  };

render() {
    const { editorState } = this.state;
    return (
      <div className="container">
        <h3>Write Blog </h3>
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <label>Select Blog Image:</label>
                <input type="file" onChange={this.imageChange} />
              </div>
            </div>
            <div className="col-7">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Blog Title"
                  onChange={this.titleChange}
                  value={this.state.title}
                />
              </div>
            </div>
            <div className="col-2">
              <div className="form-group">
                <label>Choose Category:</label>
                <select
                  className="form-control-sm"
                  onChange={this.categoryChange}
                  value={this.state.category}
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
<Editor	
editorState={editorState}
wrapperClassName="rich-editor demo-wrapper"	   
editorClassName="demo-editor"	
onEditorStateChange={this.onEditorStateChange}	  
placeholder="Blog content goes here..."	       
/>

<br></br>
<br></br>
<br></br>
<br></br>

<form onSubmit={this.handleFormSubmit}>

<button type="submit" className="btn btn-primary pull-right" style={{float:"right"}}> Submit</button>

</form>
<br></br>
<br></br>

        {/* <h4>Underlying HTML</h4>
         <div className="html-view">{getHtml(editorState)}</div>
         
        <br />
        <button className="btn btn-success" data-toggle="modal" data-target="#previewModal">
        Preview message	        
        </button>	      
        <PreviewModal output={getHtml(editorState)} /> {/* updated with output */}
       
      </div>
    );
  }
}

export default Writeblog;
