import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

class Myblogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
    };
  }
  componentDidMount() {
    if (this.props.logged_in !== true) {
      alert("You are not Logged-In");
      window.location.href = "http://localhost:3000/login";
    } else {
      let author_id = this.props.user_id;
      fetch(`http://127.0.0.1:8000/myblogs/${author_id}`, {
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
  }

  render() {
    return (
      <div className="container">
        <br />
        <h3>Blogs By Me</h3>
        <div className="row">
          {this.state.data.map((blog) => {
            return (
              <div className="col-md-4" key={blog.id}>
                <div className="thumbnail">
                  <img
                    src={blog.blog_pic}
                    alt="Nature"
                    style={{ width: "100%" }}
                  ></img>
                </div>
                <Card.Footer>
                  <div className="caption">
                    <h6 style={{ color: "blue" }}>
                      <Link to={`/detail/?id=${blog.id}&user=${blog.author}`}>
                        {blog.title}
                      </Link>
                    </h6>
                    <h6>
                      Category: <Link to={"/about"}>{blog.category}</Link>{" "}
                    </h6>
                    <button
                      onClick={() => {
                          fetch(
                            `http://127.0.0.1:8000/api/deleteblog/${blog.id}`,
                            {
                              method: "DELETE",
                            }
                          ); 
                      }}
                      className="btn btn-danger"
                    >
                      Delete This Blog
                    </button>
                  </div>
                </Card.Footer>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Myblogs;
