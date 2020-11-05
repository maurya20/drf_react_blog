import React, { Component } from "react";
import "../App.css";
import Author from "./Author";
import {Link} from 'react-router-dom'

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
    };
  }

  componentDidMount() {
    let params = new URL(window.location.href).searchParams;
    let id = params.get("id");
   
    fetch(`http://127.0.0.1:8000/api/detail/${id}`, {
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
        <div className="row" >
          <div className="col bg">
            <h6 style={{ color: "white" }}>
              Category: 
            </h6>
            <h5><Link to={`/bycategory/?c=${this.state.data.category}`}>{this.state.data.category}</Link></h5>
          </div>
          <div className="col-6">
            <h5>❝ {this.state.data.title} ❞</h5>
            <p>Published on: {this.state.data.created_on}</p>
          </div>
          <div className="col bg" style={{color:"white"}}>
            <Author />
          </div>
        </div>
        <div>
</div>
        <div className="blog-image">

          <img
            src={this.state.data.blog_pic}
            alt="Some Blog Pic"
            width="100%"
            height="500"
          />
        </div>
        <br />
        {/* <h6>{this.state.data.content}</h6> */}
        <div  dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
      </div>
    );
  }
}

export default Detail;
