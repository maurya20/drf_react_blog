import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { BlogContext } from "../store/BlogContext";
import Axios from "axios";




const Myprofile = ()=> {
  
  const [appState, setAppState] = useContext(BlogContext)
  const [data, setData] = useState([])
  const [emsg, setEmsg] = useState("")

    useEffect(() =>{
      let id = appState.uid;
      Axios.get(`http://127.0.0.1:8000/api/myprof/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("blogtoken")}`,
        },
      }).then(res=>{
        setData(res.data)
      }).catch(err=>{
        setEmsg("Something went wrong!")
        setTimeout(()=>{setEmsg("")},4000)
      })
    },[])


    
    return (
      <div className="container">
        <h3>Myprofile</h3>
        <br></br>
        <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{emsg}</h3>
        {data.map((profile) => {
          return (
            <div className="row" key={profile.id}>
              <div className="col bg-white">
                {" "}
                <img
                  src={profile.image}
                  alt="My profile Pic"
                  height="260px"
                  width="240px"
                  style={{ borderRadius: "40%" }}
                ></img>
              </div>
              <div className="col-6 bg-secondary">
                <h5>Phone <span>☎️</span> {profile.phone}</h5><hr/>
                <h5>Hobbies<span>🎮🎼🎧🎸</span> {profile.hobbies}</h5><hr/>
                <h5>Profession<span> 👩🏾‍🧑🏾‍💼</span> {profile.profession}</h5><hr/>
                <h5>Favourite Quote<span> 👌 </span> {profile.quotes}</h5><hr/>
              </div>
              <div className="col bg-white"><h5><span>⚙️</span><Link to={`/editprofile/?pid=${profile.id}`}>Edit Profile</Link></h5></div>
            </div>
          );
        })}
        <br />
      </div>
    );
  }


export default Myprofile;
