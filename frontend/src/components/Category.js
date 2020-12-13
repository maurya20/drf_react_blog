import React, {useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import loading from '../components/images/loading.gif' 
import axios from "axios"




const Category = () => {

  const [data, setData] = useState([])
  const [spinner, setSpinner] = useState(true)
  const [emsg, setEmsg] = useState("")
  let params = new URL(window.location.href).searchParams;
  let id = params.get("c");    

  useEffect(() => {
    
    axios.get(`http://127.0.0.1:8000/api/blogsbycategory/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('blogtoken')}`
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
          <h3>Blogs In {id} Category</h3>
          <h3 style={{backgroundColor:"red", color:"white", textAlign:"center"}}>{emsg}</h3>
          {spinner?<img src={loading} width="180px" height="180px" alt="Loading" className="spinner"/>:null}
            <br>
            </br>
            <div className="row">
              {data.map((blog) => {
                return (
                  <div className="col-md-4" key={blog.id}>
                    <div className="thumbnail">
                      <img src={blog.blog_pic} alt="Nature" style={{width:"100%", height:"350px", borderRadius: "5%"}}></img>
                      
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
            <br></br>
            <br></br>
            </div>
          );
        }
      
export default Category
