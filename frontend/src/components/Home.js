import React from 'react';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'




class Home extends React.Component {
  constructor(props){
    super(props)
this.state = {
        data: [],
        loaded: false,
        placeholder: "Loading",
      };
    
    }
    componentDidMount() {
       
      fetch("http://127.0.0.1:8000/api/bloglist", {
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
              data:data,
              loaded: true,
            };
          });
        });
    }
  
  
    render() {
        
      return (
        <div className="container">
          <ul className="category-nav">
            <li>
              <Link to={`/bycategory/?c=Agriculture`}>Agriculture</Link>
            </li>
            <li>
              <Link to={`/bycategory/?c=Education`}>Education</Link>
            </li>
            <li>
              <Link to={`/bycategory/?c=Science`}>Science</Link>
            </li>
            <li>
              <Link to={`/bycategory/?c=Economics`}>Economics</Link>
            </li>
            <li>
              <Link to={`/bycategory/?c=Gadgets`}>Gadgets</Link>
            </li>
            <li>
              <Link to={`/bycategory/?c=Travel`}>Travel</Link>
            </li>
            <li>
              <Link to={`/bycategory/?c=Books`}>Books</Link>
            </li>
            <li>
              <Link to={`/bycategory/?c=Other`}>Other</Link>
            </li>
          </ul>
          <br />
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
                        Category:{" "}
                        <Link to={`/bycategory/?c=${blog.category}`}>
                          {blog.category}
                        </Link>{" "}
                      </h6>
                    </div>
                  </Card.Footer>
                </div>
              );
            })}
          </div>
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabindex="-1">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <Link to={"/"} className="page-link">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2 <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
 export default Home;
