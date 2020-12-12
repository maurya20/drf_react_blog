import React, {useContext, useState} from 'react'
import {BlogContext} from '../store/BlogContext'
import axios from 'axios'





const LoginForm = () => {
  const [appState, setAppState] = useContext(BlogContext)
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  const handle_login = (e)=>{
    const data = {username:user,password:password}
      e.preventDefault();
    axios.post("http://localhost:8000/api/token-auth/",data, {
      headers: {"Content-Type": "application/json"}
    }).then((res) => {
      if(res.status===200)
      // console.log(res.data)
      localStorage.setItem("blogtoken", res.data.token)
      setAppState({
        logAction: "got",
        // username: res.data.user.username,
        // uid: res.data.user.id,
      });
    }).catch((err) => {
      setMsg("Invalid Credentials ❌")
       setTimeout(()=>{setMsg("")},4000)
      })
  }


  return (
    <div className="container">
      <br/>
      <br/>
      <div className="row">
    <div className="col-sm-4 bg-white"></div>
    <div className="col-sm-4 signupForm">
    <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{msg}</h3>
      <h3>Login Here</h3>
    <form onSubmit={(e)=>handle_login(e)}>
    <div className="form-group">
      <label >Username:</label>
      <input type="text" className="form-control" placeholder="Enter Username" onChange={(e)=>setUser(e.target.value)} />
    </div>
  
    <div className="form-group">
      <label >Password:</label>
      <input type="password" className="form-control"  placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
    </div>
   
    <button type="submit" className="btn btn-primary float-right">Submit</button>
    <br></br>
  </form>
  <br/>
    </div>
    <div className="col-sm-4 bg-white"></div>
  </div>
      <br></br>
      <br></br>
    </div>
  )
}

export default LoginForm

