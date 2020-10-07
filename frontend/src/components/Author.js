import React, { Component } from "react";

class Author extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
      user: "",
    }

  }
  
  componentDidMount() {
    let params = new URL((window.location).href).searchParams
    let user_id = params.get('user')
    fetch(`http://127.0.0.1:8000/userdetail/${user_id}`, {
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
      .then((result) => {
        this.setState(() => {
          return {
            user: result,
          };
        });
      });
  }

  render() {
    
  
    return (
      <div>
        <h6>Author: {this.state.user.username}</h6>
    <p>Email: {this.state.user.email}</p>
      </div>
    );
  }
}

export default Author;
