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
       
      fetch("http://127.0.0.1:8000/bloglist", {
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
  <li><Link to={`/bycategory/?c=Agriculture`}>Agriculture</Link></li>
  <li><Link to={`/bycategory/?c=Education`}>Education</Link></li>
  <li><Link to={`/bycategory/?c=Science&Tech`}>Science&Tech</Link></li>
  <li><Link to={`/bycategory/?c=Economics`}>Economics</Link></li>
  <li><Link to={`/bycategory/?c=Gadgets`}>Gadgets</Link></li>
  <li><Link to={`/bycategory/?c=Travel`}>Travel</Link></li>
  <li><Link to={`/bycategory/?c=Books&Literature`}>Books&Literature</Link></li>  
  <li><Link to={`/bycategory/?c=Other`}>Other</Link></li>
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
 export default Home;
