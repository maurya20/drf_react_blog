import React from 'react';

class About extends React.Component {
    render() {
       console.log(this.props)
       return (
          <div className="container">
             <h1>About Us!</h1>
             <p>
             A company profile is a professional summary of the business and its activities. You need a company profile if you want to raise capital and win investors, but you can also use it to inform other stakeholders, including clients. You will find many variations and lengths for a company profile. Some businesses may not have grown enough yet and have profiles that are just two pages long. On the other hand, some might include awards, certifications, and a large client portfolio, topping out at 30 pages.
             </p>
             <h3 className="container">
        M & M Technologies </h3>
        <p className="container">Company introduction Featured snippet from the web Simply put, your company profile is a professional introduction and aims to inform people (primarily prospective buyers and stakeholders) your products, services, and current status. A well written company profile is a great opportunity for your company to differentiate itself.</p>
        
          </div>
       )
    }
 }
 export default About;