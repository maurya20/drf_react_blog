import React, { Component } from "react";
// import ImageUploader from 'react-images-upload'
import axios from "axios";


class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      phone: "",
      hobbies: "",
      profession: "",
      quotes: "",
      uid: this.props.user_id
      
    };
    // this.onDrop = this.onDrop.bind(this);
  }


 
//   onDrop(picture) {
//     this.setState({
//         pictures: this.state.pictures.concat(picture),
//     });
// }



  imageChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

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
  // let profiledata = {
  //   image:this.state.image,
  //   phone:this.state.phone,
  //   hobbies:this.state.hobbies,
  //   profession:this.state.profession,
  //   quotes:this.state.quotes,
  //   user: this.state.uid
  // }
  let params = new URL(window.location.href).searchParams;
  let id = params.get("pid");
  console.log(id)

  console.log(this.state);
  let form_data = new FormData();
  form_data.append('image', this.state.image, this.state.image.name);
  form_data.append('phone', this.state.phone);
  form_data.append('hobbies', this.state.hobbies);
  form_data.append('profession', this.state.profession);
  form_data.append('quotes', this.state.quotes);
  form_data.append('user', this.state.uid);
  let url = `http://127.0.0.1:8000/api/updateprofile/${id}`;
  axios.put(url, form_data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
};
  }

//   fetch(`http://127.0.0.1:8000/api/updateprofile/${id}`,{
//       method: "PUT",
//       body:(profiledata),
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Media-Type':'application/x-www-form-urlencoded'
//       },
//     }).then(response => {
//       if(!response.ok) throw new Error(response.status);
//       else 
//       response.json().then(data =>{
//         alert("Profile Updated Successfully")
//       })
//   })
// } 
// }


  render() {
    console.log(this.state.image)
    console.log(this.state.uid)
    return (
      <div className="container">
        <br></br>

        <div className="col-6 bg-secondary">
          <h3>Edit Profile</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Select image:</label>

            {/* <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            /> */}
            <input
              type="file"
              accept="image/*"
              onChange={this.imageChange}
            />
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
