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
       
      fetch("http://127.0.0.1:8000/Bloglist", {
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
        
      return (
          <div className="container">
            <ul className="category-nav">
  <li><a href="#home">Agriculture</a></li>
  <li><a href="#contact">Education</a></li>
  <li><a href="#about">Science</a></li>
  <li><a href="#contact">Economics</a></li>
  <li><a href="#contact">Gadgets</a></li>
  <li><a href="#contact">Travel</a></li>
  <li><a href="#contact">Tech</a></li>
  <li><a href="#clients">Books&Literature</a></li>  
  <li><a href="#contact">Politics</a></li>
</ul>
            <br/>
        <div className="row">
          {this.state.data.map((blog) => {
            return (
              <div className="col-md-4" key={blog.id}>
                <div className="thumbnail">
                  <img src="https://picsum.photos/200" alt="Nature" style={{width:"100%"}}></img>
                  
                </div>
                <Card.Footer>
            <div className="caption">
            
                    <h6 style={{color:"blue"}}><Link to={`/detail/id=${blog.id}`}>{blog.title}</Link></h6>
                    <h6>Category: <Link to={'/about'}>{blog.category}</Link> </h6>
                   
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
 export default Home;
