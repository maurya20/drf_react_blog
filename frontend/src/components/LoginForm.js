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
    fetch("http://localhost:8000/api/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok){setMsg({msg:"Invalid Credentials ❌ "})
        setTimeout(()=>{
          setMsg({msg:""})
        },4000)
      }
        else return response.json();
      })
      .then((json) => {
        localStorage.setItem("blogtoken", json.token);

        setAppState({
          logged_in: true,
          username: json.user.username,
          uid: json.user.id,
        });
      });

  }
  return (
    <div className="container">
      <br/>
      <br/>
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
    </div>
  )
}

export default LoginForm

