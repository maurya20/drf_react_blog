import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { BlogContext } from "../store/BlogContext";
import Axios from "axios";

const Myblogs = () => {
 
  const [appState, setAppState] = useContext(BlogContext)
  const [data, setData] = useState([])
  const [emsg, setEmsg] = useState("")
  const [del, setDel] = useState("")

  useEffect(() => {
      let author_id = appState.uid;
      Axios.get(`http://127.0.0.1:8000/api/myblogs/${author_id}`, {
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
  }, [del,appState.uid])

  
    return (
      <div className="container">
        <br />
        <h3>Blogs By Me</h3>
        <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{emsg}</h3>
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
                      Category: <Link to={`/bycategory/?c=${blog.category}`}>{blog.category}</Link>{" "}
                    </h6>
                    <button
                      onClick={() => {
                          fetch(
                            `http://127.0.0.1:8000/api/deleteblog/${blog.id}`,
                            {
                              method: "DELETE",
                            }
                          )
                        
                          setDel("deleted") 
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
export default Myblogs;
