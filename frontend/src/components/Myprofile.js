import React, { Component } from "react";
import {Link} from "react-router-dom"

class Myprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    // let params = new URL(window.location.href).searchParams;
    let id = this.props.user_id;
  console.log(id)
    fetch(`http://127.0.0.1:8000/api/myprof/${id}`, {
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
        <h3>Myprofile</h3>
        <br></br>

        {this.state.data.map((profile) => {
          return (
            <div className="row" key={profile.id}>
              <div className="col bg-white">
                {" "}
                <img
                  src={profile.image}
                  alt="My profile Pic"
                  height="300px"
                  width="300px"
                  style={{ borderRadius: "30%" }}
                ></img>
              </div>
              <div className="col-6 bg-white">
                <h5>Phone <span>👉</span> {profile.phone}</h5>
                <h5>Hobbies<span>👉</span> {profile.hobbies}</h5>
                <h5>Profession<span>👉</span> {profile.profession}</h5>
                <h5>Favourite Quote<span>👉</span> {profile.quotes}</h5>
              </div>
              <div className="col bg-white"><h5><span>👉</span><Link to={`/editprofile/?pid=${profile.id}`}>Edit Profile</Link></h5></div>
            </div>
          );
        })}
        <br />
      </div>
    );
  }
}

export default Myprofile;
