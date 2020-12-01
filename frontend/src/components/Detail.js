import React, {useState, useEffect } from "react";
import "../App.css";
import Author from "./Author";
import {Link} from 'react-router-dom'
import Axios from "axios";



const Detail = () => {
  
 const [data, setData] = useState([])
 const [emsg, setEmsg] = useState("")

 useEffect(()=>{
  let params = new URL(window.location.href).searchParams;
  let id = params.get("id");
  Axios.get(`http://127.0.0.1:8000/api/detail/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("blogtoken")}`,
             }
  }).then(res=>{
    setData(res.data)
  }).catch(err=>{
    setEmsg("Something went wrong!")
    setTimeout(()=>{setEmsg("")},4000)
  })
 },[])
 
  
    return (
      <div className="container">
        <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{emsg}</h3>
        <div className="row" >
          <div className="col bg">
            <h6 style={{ color: "white" }}>
              Category: 
            </h6>
            <h5><Link to={`/bycategory/?c=${data.category}`}>{data.category}</Link></h5>
          </div>
          <div className="col-6">
            <h5>❝ {data.title} ❞</h5>
            <p>Published on: {data.created_on}</p>
          </div>
          <div className="col bg" style={{color:"white"}}>
            <Author />
          </div>
        </div>
        <div>
</div>
        <div className="blog-image">

          <img
            src={data.blog_pic}
            alt="Some Blog Pic"
            width="100%"
            height="500"
          />
        </div>
        <br />
        <div  dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    );
  }


export default Detail
