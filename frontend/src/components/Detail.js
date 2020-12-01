import React, {useState, useEffect } from "react";
import "../App.css";
import {Link} from 'react-router-dom'
import Axios from "axios";



const Detail = () => {
  
 const [data, setData] = useState([])
 const [emsg, setEmsg] = useState("")
 const [author, setAuthor] = useState([])
 const [profile, setProfile] = useState([])

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
 
 useEffect(()=>{
  let params = new URL(window.location.href).searchParams
  let user_id = params.get("user")
  Axios.get(`http://127.0.0.1:8000/api/userdetail/${user_id}`,{
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res=>{
    setAuthor(res.data)
  }).catch(err=>{
    setEmsg("Something went wrong!")
    setTimeout(()=>{setEmsg("")},4000)
  })

 },[])

 useEffect(()=>{
  let params = new URL(window.location.href).searchParams;
  let id = params.get("user");
  Axios.get(`http://127.0.0.1:8000/api/myprof/${id}`,{
    headers: {
      "Content-Type": "application/json",
             },
  }).then(res=>{
    setProfile(res.data)
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
            {/* for author details */}
          {profile.map((profile) => {
          return (
            <div className="row" key={profile.id}>
          <h4>
                Author:
                <Link
                  to={`/bb/?id=${author.id}&au=${author.username}`}
                >
                  {" "}
                  {author.username}
                </Link>{" "}
              </h4>
              <img
                src={profile.image}
                alt="My profile Pic"
                height="80px"
                width="80px"
                style={{ borderRadius: "50%" }}
              ></img>
              <p>Email: {author.email}</p>
              <h5>
                Favourite Quote<span> 👌 </span> {profile.quotes}
              </h5>
            </div>
          );
        })}
            
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
