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





     // display_form = form => {
  //   this.setState({
  //     displayed_form: form
  //   });
  // };





  
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
  



  //displayed_form: "",