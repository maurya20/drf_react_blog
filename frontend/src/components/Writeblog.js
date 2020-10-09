import React, { Component } from "react";


class Writeblog extends Component {
    constructor(props) {
        super(props)
        this.state = {
          title: '',
          category: '',
          content:'',
          author:''
        }
      }
      titleChange = (event)=>{
        this.setState({
          title:event.target.value
        })
      }
      categoryChange = (event)=>{
        this.setState({
          category:event.target.value
        })
      }
      contentChange = (event)=>{
        this.setState({
          content:event.target.value
        })
      }
     

    
    
      handleFormSubmit=(event)=>{
          if(this.props.logged_in !==true){
              alert("You are not Logged-In")
          }
          else{
        event.preventDefault();
        let blogdata = {title:this.state.title,
          category:this.state.category,
          content:this.state.content,
          author:this.props.user_id}
  
          
        fetch('http://127.0.0.1:8000/create/',{
            method: "POST",
            body: JSON.stringify(blogdata),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {
            if(!response.ok) throw new Error(response.status);
            else 
            response.json().then(data =>{
              alert("Blog Created Successfully")
            })
        })
      } 
    }
  render() {
    console.log(this.props.username) 
    return (
      <div className="container">
        <h3>Write Blog By Submitting Bellow Form</h3>
        <form onSubmit={this.handleFormSubmit}>
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
          <div className="form-group">
            <label>Choose Category:</label>
            <select className="form-control-sm" onChange={this.categoryChange} value={this.state.category}>
            <option>Select Category</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Education">Education</option>
              <option value="Science&Tech">Science&Tech</option>
              <option value="Economics">Economics</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Travel">Travel</option>
              <option value="Books&Literature">Books&Literature</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter Blog content"
              onChange={this.contentChange}
              value={this.state.content}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br />
      </div>
    );
  }
}

export default Writeblog;
