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
      <div>
        <h1>{this.state.data.title}</h1>
      </div>
    );
  }
}

export default Detail;
