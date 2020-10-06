import React, { Component } from "react";
import '../App.css'

export class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      user:[]
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
 //   for User details
 // eslint-disable-next-line
//  componentDidMount() {
//   fetch(`http://127.0.0.1:8000/userdetail/2`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `JWT ${localStorage.getItem("token")}`,
//     },
//   })
//     .then((response) => {
//       if (response.status > 400) {
//         return this.setState(() => {
//           return { placeholder: "Something went wrong!" };
//         });
//       }
//       return response.json();
//     })
//     .then((result) => {
//       this.setState(() => {
//         return {
//           user:result
      
//         };
//       });
//     });
// }
  render() {
    
    
    return (
      <div className="container">
        <div className="blog-heading">
        <h5>{this.state.data.title} </h5><h6 style={{color:'red'}}>Category:{this.state.data.category}</h6>
        </div>
    <p>Published on: {this.state.data.created_on}</p>
    <h3>Author:{this.state.user.username}</h3>
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
