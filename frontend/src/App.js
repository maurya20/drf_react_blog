import React, {useContext } from "react";
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
import Myprofile from './components/Myprofile'
import Editprofile from "./components/Editprofile"
import Category from "./components/Category";
import Bb from './components/Bb'
import {BlogContext} from './store/BlogContext'


const App = ()=>{
 const [appState, setAppState] = useContext(BlogContext)



  // handle_login = (e, data) => {
  //   e.preventDefault();
  //   fetch("http://localhost:8000/api/token-auth/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok){this.setState({msg:"Invalid Credentials ❌ "})
  //       setTimeout(()=>{
  //         this.setState({msg:""})
  //       },4000)
  //     }
  //       else return response.json();
  //     })
  //     .then((json) => {
  //       localStorage.setItem("token", json.token);

  //       this.setState({
  //         logged_in: true,
  //         username: json.user.username,
  //         user_id: json.user.id,
  //       });
  //     });
  // };

 
    
    return (
      <div>
        <BrowserRouter>
          <Header/>
         <div style={{color:'white',backgroundColor:"red",textAlign:'center'}}><h3></h3></div>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/writeblog">
            <Writeblog />
          </Route>
          <Route
            path="/login"
            render={() =>
              appState.logged_in ? (
                <Redirect to="/" />
              ) : (
                <LoginForm />
              )
            }
          />

          <Switch>
            <Route path="/detail" component={Detail} />
          </Switch>
          <Route path="/myblogs"><Myblogs /></Route>
          <Route path="/myprofile"><Myprofile /></Route>
          <Route path="/editprofile"><Editprofile /></Route>
          <Route path="/bycategory"><Category /></Route>
          <Route path="/bb"><Bb /></Route>
          
        </BrowserRouter>
        <Footer />
      </div>
    );
  }


export default App;
