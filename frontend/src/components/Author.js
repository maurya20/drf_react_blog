import React, { Component } from "react";
import { Link } from "react-router-dom";

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      profile: [],
    };
  }

  componentDidMount() {
    let params = new URL(window.location.href).searchParams;
    let user_id = params.get("user");
    fetch(`http://127.0.0.1:8000/api/userdetail/${user_id}`, {
      headers: {
        "Content-Type": "application/json",
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
    // }
    // componentDidMount() {
    // let params = new URL((window.location).href).searchParams
    let id = params.get("user");
    fetch(`http://127.0.0.1:8000/api/myprof/${id}`, {
      headers: {
        "Content-Type": "application/json",
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
            profile: data,
          };
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.profile.map((profile) => {
          return (
            <div className="row" key={profile.id}>
              <h4>
                Author:
                <Link
                  to={`/bb/?id=${this.state.user.id}&au=${this.state.user.username}`}
                >
                  {" "}
                  {this.state.user.username}
                </Link>{" "}
              </h4>
              <img
                src={profile.image}
                alt="My profile Pic"
                height="80px"
                width="80px"
                style={{ borderRadius: "50%" }}
              ></img>
              <p>Email: {this.state.user.email}</p>
              <h5>
                Favourite Quote<span> 👌 </span> {profile.quotes}
              </h5>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Author;
