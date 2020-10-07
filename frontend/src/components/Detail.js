import React, { Component } from "react";
import '../App.css'
import Author from './Author'

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
    let params = new URL((window.location).href).searchParams
    let id = params.get('id')
    console.log(id)
    fetch(`http://127.0.0.1:8000/detail/${id}`, {
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
        <div className="blog-heading">
        <h5>{this.state.data.title} </h5><h6 style={{color:'red'}}>Category:{this.state.data.category}</h6>
        </div>
    <p>Published on: {this.state.data.created_on}</p>
    <Author/>
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
