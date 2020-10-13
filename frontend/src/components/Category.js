import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class Category extends Component {
    constructor(props){
        super(props)
    this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
          };
        
        }
        componentDidMount() {
            let params = new URL(window.location.href).searchParams;
            let id = params.get("c");
          fetch(`http://127.0.0.1:8000/api/blogsbycategory/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          }
          )
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
            let params = new URL(window.location.href).searchParams;
            let id = params.get("c");
          return (
              <div className="container">
                <br/>
          <h3>Blogs In {id} Category</h3>
            <div className="row">
              {this.state.data.map((blog) => {
                return (
                  <div className="col-md-4" key={blog.id}>
                    <div className="thumbnail">
                      <img src="https://picsum.photos/200" alt="Nature" style={{width:"100%"}}></img>
                      
                    </div>
                    <Card.Footer>
                <div className="caption">
                
                        <h6 style={{color:"blue"}}><Link to={`/detail/?id=${blog.id}&user=${blog.author}`}>{blog.title}</Link></h6>
                        <h6>Category: <Link to={`/bycategory/?c=${blog.category}`}>{blog.category}</Link> </h6>
                       
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
export default Category
