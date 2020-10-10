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

    fetch(`http://127.0.0.1:8000/api/myprof/8`, {
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
                <h5>Phone 👉 {profile.phone}</h5>
                <h5>Hobbies👉 {profile.hobbies}</h5>
                <h5>Profession👉 {profile.profession}</h5>
                <h5>Favourite Quote👉 {profile.quotes}</h5>
              </div>
              <div className="col bg-white"><h5>👉<Link to={`/editprofile/?pid=${profile.id}`}>Edit/Complete Profile</Link></h5></div>
            </div>
          );
        })}
        <br />
      </div>
    );
  }
}

export default Myprofile;
