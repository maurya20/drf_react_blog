import React from 'react';
// import './Home.css'


class Home extends React.Component {
  constructor(props){
    super(props)
this.state = {
        data: [],
        loaded: false,
        placeholder: "Loading",
      };
    
    }
    componentDidMount() {
       
      fetch("http://127.0.0.1:8000/Bloglist", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }
      )
        .then((response) => {
          if (response.status > 400) {
            return this.setState(() => {
              return { placeholder: "Something went wrong!" };
            });
          }
          return response.json();
        })
        .then((data) => {
          this.setState(() => {
            return {
              data,
              loaded: true,
            };
          });
        });
    }
  
  
    render() {
        console.log(localStorage.getItem('token'))
      return (
          <div className="container">
        <div className="row">
          {this.state.data.map((contact) => {
            return (
              <div className="col-md-4" key={contact.id}>
                <div className="thumbnail">
                  <img src="https://picsum.photos/200" alt="Nature" style={{width:"100%"}}></img>
                  <div className="caption">
                    <p style={{color:"black"}}>{contact.title}</p>
                    <p>Category: {contact.category} </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      );
    }
  }
 export default Home;
