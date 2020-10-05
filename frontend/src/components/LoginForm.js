import React from "react";


class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div className="container">
        <br/>
        <br/>
        <h3>Login Here!!</h3>
        <form
          className="form-inline"
          onSubmit={(e) => this.props.handle_login(e, this.state)}
        >
          <label className="mb-2 mr-sm-2">Username:</label>
          <input
            type="text"
            className="form-control mb-2 mr-sm-2"
            name="username"
            value={this.state.username}
            onChange={this.handle_change}
          />
          <label className="mb-2 mr-sm-2">Password:</label>
          <input
            className="form-control mb-2 mr-sm-2"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handle_change}
          />

          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </form>
        <br/>
        <br/>
      </div>
    );
  }
}

export default LoginForm;


