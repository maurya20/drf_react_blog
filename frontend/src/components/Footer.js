import React, { Component } from "react";
import '../App.css'

export class Footer1 extends Component {
  render() {
    return (
      <div className="footer1">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              {" "}
              <h5 className="title">M & M Enterprises</h5>
              <p>Email: mukesh.ice17@gmail.com</p>
              <p>Mob: 9540339805</p>
              <p>308, Oreo Lane, Tihayatpur, Rajesultanpur, Anjan Shaheed.</p>
              <p>U.P. India</p>
            </div>
            <div className="col">
              <h5 className="title">Links</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="https://maurya20.github.io/rrt/">
                    Sample Trading Info Website
                  </a>
                </li>
                <li className="list-unstyled">
                  <a href="https://maurya20.github.io/amb_website/">
                    Sample Company Info Website
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>Find us on map-</h5>
              <iframe title="Footer"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
              style={{width:"100%", height:"85%" }}
              />
            </div>
          </div>
        </div>
        <div className="design">Designed by- Mukesh Maurya </div>
      </div>
    );
  }
}

export default Footer1;
