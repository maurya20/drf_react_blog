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
        username: res.data.user.username,
        uid: res.data.user.id,
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
      <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{msg}</h3>
      <br></br>
      <h3>Login Here!!</h3>
 
      <form
        className="form-inline"
        onSubmit={(e) => handle_login(e)}
      >
        <label className="mb-2 mr-sm-2">Username:</label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          name="username"
          onChange={(e)=>setUser(e.target.value)}
        />
        <label className="mb-2 mr-sm-2">Password:</label>
        <input
          className="form-control mb-2 mr-sm-2"
          type="password"
          name="password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
      <br/>
      <br/>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default LoginForm

