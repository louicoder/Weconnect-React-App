import React, {Component} from 'react';
import {isAuthenticated, notification} from '../../helper/Utils';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import logo1 from '../../images/logo1.jpg';
import Notifications from 'react-notify-toast';

class BusinessRegistration extends Component{

    state = {
        business_name: "",
        category:"",
        location:"",
        description:"",
        isAuthenticated: isAuthenticated() ? true : false
    }

    change = e =>{
        this.setState({
            [e.target.name]:e.target.value
        });

    };

    registerBusiness = (e)=>{
        e.preventDefault();
        console.log(this.state)
        if(this.state.name !== ""){
            const business = {
                name: this.state.business_name,
                category:this.state.category,
                location:this.state.location,
                description:this.state.description
            }
    
            axios.post('http://127.0.0.1:5000/api/businesses', business,
            {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}}
            )
            .then(res =>{
                this.setState({"business_name":'',"category":'',"location":'',"description":''})
                notification("success", res.data['message'])
            })
            .catch(error => {
                if (error.response) {
                    notification("error", error.response.data['message']); 
                }
            })
        }
        else{
            notification("error", "Business name is required");
        }
        
    }

    // function renders the registration page for a business
    render(){
        return(
            isAuthenticated() ? 
            <div className="container">
            <Notifications/>
                <br/><br/>
                    <div className="row">
                        <div className="col col-md-8">
                            <img src={logo1} className="img img-responsive img-thumbnail" alt=""/>
                        </div>
                        <div className="col col-md-4 ">
                            <form action="#" method="" className="" id="businessForm">
                                <h5 className="text-muted">REGISTER YOUR BUSINESS</h5>
                                <hr/>
                                <div className="form-group">
                                    <label>Business Name</label>
                                    <input type="text" id="business" name="business_name" onChange={this.change} className="form-control" placeholder="Enter Business Name" required/>
                                </div>
                                
                                <div className="form-group">
                                    <label>Enter Location</label>
                                    <input type="text" name="location" onChange={this.change} className="form-control" placeholder="Enter Business Location"/>
                                </div>

                                <div className="form-group">
                                    <label>Enter Category</label>
                                    <input type="text" name="category" onChange={this.change} className="form-control" placeholder="Enter Business Category"/>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="description" onChange={this.change} className="form-control" rows="3" placeholder="Enter brief description about your Business"></textarea>
                                </div>
                                
                                
                                <div className="align-items-md-end">
                                    <button type="submit" onClick={this.registerBusiness} className="btn btn-success btn-lg col-md-12">REGISTER BUSINESS</button>
                                </div>
                            </form>

                        </div>              
                    </div>
                <br/><br/><br/><br/><br/><br/>
            </div>
        : <Redirect to="/login"/>
     
        ); 
    };
}

export default BusinessRegistration;