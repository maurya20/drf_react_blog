import React, { Component } from 'react'

export class Editprofile extends Component {
    constructor(props) {
        super(props)
        this.state = {
          image: '',
          phone: '',
          hobbies:'',
          profession:'',
          quotes:''
        }
      }

      imageChange = (event)=>{
        this.setState({
          image:event.target.value
        })
      }
     
      phoneChange = (event)=>{
        this.setState({
          phone:event.target.value
        })
      }
      hobbiesChange = (event)=>{
        this.setState({
          hobbies:event.target.value
        })
      }
      professionChange = (event)=>{
        this.setState({
          profession:event.target.value
        })
      }
      quotesChange = (event)=>{
        this.setState({
          quotes:event.target.value
        })
      }
     

    render() {
        return (
            <div className="container">
                <br></br>
                <div className="col-6 bg-secondary">
                    <h3>Complete Your Profile</h3>
               <form>
  <label>Select image:</label>
  <input type="file" id="img" name="img" accept="image/*" onChange={this.imageChange}
              value={this.state.image}/>
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

            </div>
        )
    }
}

export default Editprofile


