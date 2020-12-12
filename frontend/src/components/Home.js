import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import loading from '../components/images/loading.gif' 
import axios from "axios"




const Home = () => {

  const [data, setData] = useState([])
  const [spinner, setSpinner] = useState(true)
  const [emsg, setEmsg] = useState("")   

  useEffect(()=>{
      axios.get("http://127.0.0.1:8000/api/bloglist", {
            headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`
                     }
      }).then(res=>{
        setData(res.data)
        setSpinner(false)
      }).catch(err=>{
        setEmsg("Something went wrong!")
    setTimeout(()=>{setEmsg("")},4000)
      })
  },[])

  
        
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
          <h3 style={{backgroundColor:"red", color:"white", textAlign:"center"}}>{emsg}</h3>
          {spinner?<img src={loading} width="300px" height="300px" alt="Loading"/>:null}
    
          <br />
          <div className="row">
            
            {data.map((blog) => {
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
         
        </div>
      );
    }
  
 export default Home;
