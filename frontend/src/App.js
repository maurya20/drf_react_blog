import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Detail from "./components/Detail"
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
// import Switch from "react-bootstrap/esm/Switch";

class App extends Component {
  state = {
    logged_in: localStorage.getItem("token") ? true : false,
    username: "",
  };

  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    
      // .then((res) => res.json())
      .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          username: json.user.username,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
  };

  render() {
    console.log(this.state.logged_in);
    return (
      <div>
        <BrowserRouter>
          <Header
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
            {...this.state}
          />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/signup">
            <SignupForm handle_signup={this.handle_signup} />
          </Route>

          <Route
            path="/login"
            render={() =>
              this.state.logged_in ? (
                <Redirect to="/" />
              ) : (
                <LoginForm handle_login={this.handle_login} />
              )
            }
          />
          <Switch>
          <Route path="/detail" component={Detail} />
          </Switch>
          
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
