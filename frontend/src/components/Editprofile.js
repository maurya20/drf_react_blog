import React, { Component } from "react";
import ImageUploader from 'react-images-upload'


class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      phone: "",
      hobbies: "",
      profession: "",
      quotes: "",
      uid: this.props.user_id
      
    };
    this.onDrop = this.onDrop.bind(this);
  }


 
  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
}



  // imageChange = (event) => {
  //   this.setState({
  //     image: event.target.files[0],
  //   });
  // };

  phoneChange = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };
  hobbiesChange = (event) => {
    this.setState({
      hobbies: event.target.value,
    });
  };
  professionChange = (event) => {
    this.setState({
      profession: event.target.value,
    });
  };
  quotesChange = (event) => {
    this.setState({
      quotes: event.target.value,
    });
  };

  handleFormSubmit=(event)=>{
    if(this.props.logged_in !==true){
        alert("You are not Logged-In")
        // window.location.href = "http://localhost:3000/login"
        // const { history } = this.props.history;
        // history.push("/login")
    }
    else{
  event.preventDefault();
  let profiledata = {
    image:this.state.uid,
    phone:this.state.phone,
    hobbies:this.state.hobbies,
    profession:this.state.profession,
    quotes:this.state.quotes,
    user: this.state.uid
  }
  let params = new URL(window.location.href).searchParams;
  let id = params.get("pid");
  console.log(id)
  fetch(`http://127.0.0.1:8000/api/updateprofile/${id}`,{
      method: "PUT",
      body: JSON.stringify(profiledata),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if(!response.ok) throw new Error(response.status);
      else 
      response.json().then(data =>{
        alert("Profile Updated Successfully")
      })
  })
} 
}


  render() {
    console.log(this.state.pictures)
    console.log(this.state.uid)
    return (
      <div className="container">
        <br></br>

        <div className="col-6 bg-secondary">
          <h3>Edit Profile</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Select image:</label>

            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            {/* <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={this.imageChange}
              value={this.state.image}
            /> */}
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                onChange={this.phoneChange}
                value={this.state.phone}
              />
            </div>

            <div className="form-group">
              <label>Hobbies:</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter hobbies"
                onChange={this.hobbiesChange}
                value={this.state.hobbies}
              />
            </div>
            <div className="form-group">
              <label>Profession:</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Profession"
                onChange={this.professionChange}
                value={this.state.profession}
              />
            </div>
            <div className="form-group">
              <label>Quotes:</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Quotes"
                onChange={this.quotesChange}
                value={this.state.quotes}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <br></br>
        </div>
        <br></br>
          <h1>{this.props.user_id}</h1>
      </div>
    );
  }
}

export default Editprofile;
