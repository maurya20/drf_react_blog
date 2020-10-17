import React, { Component } from 'react'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password:'',
      password2:''
    }
  }
  usernameChange = (event)=>{
    this.setState({
      username:event.target.value
    })
  }
  emailChange = (event)=>{
    this.setState({
      email:event.target.value
    })
  }
  passwordChange = (event)=>{
    this.setState({
      password:event.target.value
    })
  }
  password2Change = (event)=>{
    this.setState({
      password2:event.target.value
    })
  }


  handleFormSubmit=(event)=>{
    event.preventDefault();
    let userdata = {username:this.state.username,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2}
      if (this.state.password!== this.state.password2) {
        alert("Passwords don't match")
        
        // window.location.href = "http://localhost:3000/signup/"
      }
      else
    fetch('http://127.0.0.1:8000/signup/',{
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        if(!response.ok) throw new Error(response.status);
        else 
        response.json().then(data =>{
          alert(JSON.stringify(data))
          // window.location.href = "login"
        })
    })
  } 
  
  render() {
    
    return (
      <div>
      <div className="row">
    <div className="col bg-white"></div>
    <div className="col-6 bg-secondary">
      <h3>Register Here</h3>
    <form onSubmit={this.handleFormSubmit}>
    <div className="form-group">
      <label >Username:</label>
      <input type="text" className="form-control" placeholder="Enter Username" onChange={this.usernameChange} value={this.state.username}/>
    </div>
    <div className="form-group">
      <label >Email:</label>
      <input type="email" className="form-control"  placeholder="Enter email" onChange={this.emailChange} value={this.state.email}/>
    </div>
    <div className="form-group">
      <label >Password:</label>
      <input type="password" className="form-control"  placeholder="Enter password" onChange={this.passwordChange} value={this.state.password} />
    </div>
    <div className="form-group">
      <label >Confirm Password:</label>
      <input type="password" className="form-control"  placeholder="Confirm password"onChange={this.password2Change} value={this.state.password2} />
    </div>
    <div className="form-group form-check">
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox"/> Remember me
      </label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  <br/>
    </div>
    <div className="col bg-white"></div>
  </div>
  <br/>
      </div>
    )
  }
}

export default SignupForm
