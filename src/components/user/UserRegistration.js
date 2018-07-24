import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { isAuthenticated } from '../../helper/Utils';
import {notification} from '../../helper/Utils';
import Notifications from 'react-notify-toast';
import {BASE_URL} from '../../helper/Url'

class Registration extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:"",
            email:"",
            password:"",
            rpassword:"",
            loggedIn : isAuthenticated() ? true : false
        };
    };

    change = e =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    onSubmit = e =>{
        e.preventDefault();
        if(this.state.password === this.state.rpassword){
            axios.post(`${BASE_URL}api/auth/register`, {
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            rpassword:this.state.rpassword
            })
            .then(res =>{
                this.props.history.push("/login");
                notification("success", res.data['message'])
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data)
                    notification("error", error.response.data['message'])
                }
            });
        }else{
            notification("error", "passwords do not match, Try again")
        }
        
    };

    render() {
        // console.log(this.state);
        return (
            <div>
                <Notifications/>
                <div className="container">
                    <div className="container col-md-8">
                        <div className="row"><br/><br/>

                            <div className="col pr-md-4 mt-md-5">
                                <h5 className="text-muted">WELCOME TO WECONNECT</h5><hr />
                                <p className="text-muted">
                                    WeConnect is a business catalog application that will provide you with the relevant information about registered businesses. When a user has registered they can be able to register a business, leave a review on another business or there's and be able to also search businesses based on location or category. Please register in the form on the right and have all these proviledges. non registered users can however have access to viewing businesses only.
                                </p>
                            </div>
                            <div className="col col-md-6 mb-4 border-left pl-md-4 col-12 mt-4 mt-md-5">
                                
                                <form action="#" method="" className="pl-md-4">
                                    <h5 className="text-muted">REGISTRATION </h5>
                                    <hr />
                                    {/* <div className="form-group">
                                        <label for="">Full Name</label>
                                        <input type="text" value={this.state.fullname} className="form-control" id="" placeholder="Enter Full name" />
                                    </div> */}
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" id="username"  name="username" value={this.state.username} onChange={e =>this.change(e)} className="form-control" placeholder="Enter Username" />
                                    </div>

                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email"  name="email" value={this.state.email} onChange={e =>this.change(e)} className="form-control" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password"  name="password" value={this.state.password} onChange={e =>this.change(e)} className="form-control" placeholder="Password" />
                                    </div>

                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password"  name="rpassword" value={this.state.rpassword} onChange={e =>this.change(e)} className="form-control" placeholder="Confirm Password" />
                                        <small id="" className="form-text text-muted">Enter the same password you entered above.</small>
                                    </div>

                                    <div className="align-items-md-end">
                                        <button type="submit" onClick={this.onSubmit } className="btn btn-success btn-lg col-md-12">REGISTER</button>
                                    </div><br />
                                    {/* <a href="login.html">Already a user? Click to ?Login</a> */}
                                    <Link to="/login" className="page-link">Already registered? Click here to Login</Link>
                                </form>
                                

                            </div>

                        </div>
                    </div>

                </div>
                <br/><br/><br/><br/>
            </div>
            

        );
    };
}

export default Registration;