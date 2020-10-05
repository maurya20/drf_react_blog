import React, { Component, browserHistory } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header'
import Home from './components/Home'
import Footer from "./components/Footer"
import About from './components/About'
import { BrowserRouter, Route,Redirect} from "react-router-dom";


class App extends Component {
  
    state = {
      // displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  
   
  // componentDidMount() {
  //   if (this.state.logged_in) {
  //     fetch('http://localhost:8000/current_user/', {
  //       headers: {
  //         Authorization: `JWT ${localStorage.getItem('token')}`
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({ username: json.username });
  //       });
  //   }
  // }
  
  
  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
      
  };

  // handle_signup = (e, data) => {
  //   e.preventDefault();
  //   fetch('http://localhost:8000/users/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       localStorage.setItem('token', json.token);
  //       this.setState({
  //         logged_in: true,
  //         displayed_form: '',
  //         username: json.username
  //       });
  //     });
  // };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  // display_form = form => {
  //   this.setState({
  //     displayed_form: form
  //   });
  // };

  render() {
    // let form;
    // switch (this.state.displayed_form) {
    //   case 'login':
    //     form = <LoginForm handle_login={this.handle_login} />;
    //     break;
    //   case 'signup':
    //     form = <SignupForm handle_signup={this.handle_signup} />;
    //     break;
    //   default:
    //     form = null;
    // }
    console.log(this.state.logged_in)
    return (
      <div>
        <BrowserRouter>
        <Header
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        {...this.state}/>
        
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        {/* <Route path="/login"><LoginForm handle_login={this.handle_login} /></Route> */}
        <Route path="/signup"><SignupForm handle_signup={this.handle_signup} /></Route>

        <Route path="/login" render={() => (
  this.state.logged_in ? (
    <Redirect to="/"/>
  ) : (
    <LoginForm handle_login={this.handle_login} />
  )
)}/>
        </BrowserRouter>
        <Footer/>
      </div>
      
    );
  }
}

export default App;