import React, {useState, useContext} from "react";
import axios from "axios";
import {BlogContext} from '../store/BlogContext'

const Editprofile = () => {
  

  const [appState, setAppState] = useContext(BlogContext)
  const [imgState, setImgState] = useState({image:null, preview:null})
  const [phone, setPhone] = useState("")
  const [hobbies, setHobbies] = useState("")
  const [profession, setProfession] = useState("")
  const [quotes, setQuotes] = useState("")
  const [emsg, setEmsg] = useState("")
  const [smsg, setSmsg] = useState("")
  
    

  const imageChange = (event) => {
    setImgState({image:event.target.files[0], preview:URL.createObjectURL(event.target.files[0])})
  }

 const phoneChange = (event) => {
    setPhone(event.target.value);
  };
  const hobbiesChange = (event) => {
    setHobbies(event.target.value);
  };
  const professionChange = (event) => {
  setProfession(event.target.value)
  };
  const quotesChange = (event) => {
  setQuotes(event.target.value)
  };

  const handleFormSubmit = (e) => {
      e.preventDefault()
      let params = new URL(window.location.href).searchParams;
      let id = params.get("pid");
      let form_data = new FormData();
      form_data.append("image", imgState.image, imgState.image.name);
      form_data.append("phone", phone);
      form_data.append("hobbies", hobbies);
      form_data.append("profession", profession);
      form_data.append("quotes", quotes);
      form_data.append("user", appState.uid);
      let url = `http://127.0.0.1:8000/api/updateprofile/${id}`;
      axios
        .put(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          //console.log(res);
          if(res.status==200)
          setSmsg("Profile Updated Successfully")
          setTimeout(()=>{setSmsg("")},4000)
        })
        .catch((err) => {
        //console.log(err)
        setEmsg("Something went wrong!")
          setTimeout(()=>{setEmsg("")},4000)
        });
    }
  

    return (
      <div className="container">
        <h3 style={{backgroundColor:'green',color:'white',textAlign:'center'}}>{smsg}</h3>
        <h3 style={{backgroundColor:'red',color:'white',textAlign:'center'}}>{emsg}</h3>
        <div className="row">
        <div className="col-6 bg-secondary">
          <h3>Edit Profile</h3>
         
            <label>Select image:</label>
            <input type="file" accept="image/*" onChange={imageChange} /><img src={imgState.preview} alt="" width="150" height="160"/>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone Number"
                onChange={phoneChange}
                value={phone}
              />
            </div>

            <div className="form-group">
              <label>Hobbies:</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter hobbies"
                onChange={hobbiesChange}
                value={hobbies}
              />
            </div>

          <br></br>
        </div>
        <div className="col-6 bg-secondary">
        <div className="form-group">
              <label>Profession:</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Profession"
                onChange={professionChange}
                value={profession}
              />
            </div>
            <div className="form-group">
              <label>Quotes:</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Quotes"
                onChange={quotesChange}
                value={quotes}
              />
            </div>
            <form onSubmit={(e)=>handleFormSubmit(e)}>
            <button type="submit" className="btn btn-primary float-right">
              Submit
            </button>
          </form>
        </div>
        <br></br>
        </div>
      </div>
    );
  }


export default Editprofile
