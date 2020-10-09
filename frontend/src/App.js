import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Detail from "./components/Detail";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Writeblog from "./components/Writeblog";
import Myblogs from "./components/Myblogs";

class App extends Component {
  state = {
    logged_in: localStorage.getItem("token") ? true : false,
    username: "",
    user_id: "",
  };

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username,user_id:json.id });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((json) => {
        localStorage.setItem("token", json.token);

        this.setState({
          logged_in: true,
          username: json.user.username,
          user_id: json.user.id,
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header
            logged_in={this.state.logged_in}
            handle_logout={this.handle_logout}
            {...this.state}
          />

          <Route exact path="/">
            <Home {...this.state} />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/writeblog">
            <Writeblog {...this.state} />
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
          <Route path="/myblogs"><Myblogs /></Route>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
