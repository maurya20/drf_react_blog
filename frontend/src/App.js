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
          <Route path="/login" render={() => appState.logged_in ? (<Redirect to="/" />) : (<LoginForm />)}/>

          <Switch>
            <Route path="/detail" component={Detail} />
          </Switch>
          <Route path="/editprofile" render={() => appState.logged_in ? (<Editprofile />) : (<Redirect to="/" />)}/>
          <Route path="/myprofile" render={() => appState.logged_in ? (<Myprofile />) : (<Redirect to="/" />)}/>
          <Route path="/myblogs" render={() => appState.logged_in ? (<Myblogs />) : (<Redirect to="/" />)}/>
          {/* <Route path="/myprofile"><Myprofile /></Route> */}
          {/* <Route path="/editprofile"><Editprofile /></Route> */}
          <Route path="/bycategory"><Category /></Route>
          <Route path="/bb"><Bb /></Route>
          
        </BrowserRouter>
        <Footer />
      </div>
    );
  }


export default App;
