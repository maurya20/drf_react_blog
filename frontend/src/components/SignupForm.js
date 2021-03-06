import React, { useState, useContext } from 'react'
import axios from 'axios'
import {BlogContext} from "../store/BlogContext"



const SignupForm = ()=>{
 
  const [appState, setAppState] = useContext(BlogContext)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [msg, setMsg] = useState("")
  const [smsg, setSmsg] = useState("")
  

  const validateEmail = (email)=>{
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    


  const handleFormSubmit=(e)=>{
    e.preventDefault();
    let userdata = {username:username,
      email:email,
      password:password}
    if(password!==password2){
    setMsg("Password do not match!")
    setTimeout(()=>{setMsg("")},4000)}
    else if(validateEmail(email)==false){
    setMsg("Invalid Email")
       setTimeout(()=>{setMsg("")},4000)}
    else{
    axios.post('http://127.0.0.1:8000/api/user_signup/',userdata,{
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        // console.log(res.data)
        if(res.data.error)
        setMsg(res.data.error)
       setTimeout(()=>{setMsg("")},4000)
       if(res.data.success){
       setSmsg(res.data.success)
       setTimeout(()=>{
         setSmsg("")
         setAppState({signup:true})
        },4000)
      }
      }).catch((err) => {
        setMsg("User already exist!")
         setTimeout(()=>{setMsg("")},4000)
        })
  }
}
  
  
    
    return (
      <div className="container">
      <div className="row">
    <div className="col-sm-4 bg-white"></div>
    <div className="col-sm-4 signupForm">
    <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{msg}</h3>
    <h3 style={{backgroundColor:'green',color:'white',textAlign:'center'}}>{smsg}</h3>
      <h3>Register Here</h3>
    <form onSubmit={(e)=>handleFormSubmit(e)}>
    <div className="form-group">
      <label >Username:</label>
      <input type="text" className="form-control" placeholder="Enter Username" onChange={(e)=>setUsername(e.target.value)} />
    </div>
    <div className="form-group">
      <label >Email:</label>
      <input type="email" className="form-control"  placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
    </div>
    <div className="form-group">
      <label >Password:</label>
      <input type="password" className="form-control"  placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <div className="form-group">
      <label >Confirm Password:</label>
      <input type="password" className="form-control"  placeholder="Confirm password"onChange={(e)=>setPassword2(e.target.value)} />
    </div>
    <div className="form-group form-check">
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox"/> Remember me
      </label>
    </div>
    <button type="submit" className="btn btn-primary float-right">Submit</button>
    <br></br>
  </form>
  <br/>
    </div>
    <div className="col-sm-4 bg-white"></div>
  </div>
  <br/>
      </div>
    )
  }


export default SignupForm
