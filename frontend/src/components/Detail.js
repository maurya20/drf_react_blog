import React, { Component } from "react";

export class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
    };
  }

  
  componentDidMount() {
    let baseUrl = (window.location).href
    let blog_id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)
    fetch(`http://127.0.0.1:8000/detail/${blog_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then((data) => {
        this.setState(() => {
          return {
            data,
            loaded: true,
          };
        });
      });
  }
 
  render() {
    
    
    return (
      <div className="container">
        <h3 className="blog-heading">{this.state.data.title}</h3>
    <p>Published on: {this.state.data.created_on}</p>
    <div className="blog-image">
          <img src='https://source.unsplash.com/random'alt="Some Blog Pic" width="100%" height="500" />
        </div>
        <br/>
    <p>{this.state.data.content}</p>
      </div>
    );
  }
}

export default Detail;
