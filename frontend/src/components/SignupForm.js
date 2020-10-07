import React, { Component } from 'react'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password:''
    }
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    let username = this.state.username
    
  }
  
  render() {
    return (
      <div>
      <div className="row">
    <div className="col bg-white"></div>
    <div className="col-6 bg-secondary">
      <h3>Register Here</h3>
    <form>
    <div className="form-group">
      <label for="text">Username:</label>
      <input type="text" className="form-control" placeholder="Enter email" name="username"/>
    </div>
    <div className="form-group">
      <label for="email">Email:</label>
      <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"/>
    </div>
    <div className="form-group">
      <label for="pwd">Password:</label>
      <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"/>
    </div>
    <div className="form-group form-check">
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox" name="remember"/> Remember me
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
