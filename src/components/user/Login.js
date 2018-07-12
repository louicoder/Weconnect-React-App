import React, { Component } from 'react';
import axios from 'axios';
import {isAuthenticated} from '../../helper/Utils';
import {Link} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {notification} from '../../helper/Utils';
import {BASE_URL} from '../../helper/Url'

class Login extends Component {

    state = {
        password:"",
        username:""
    };

    change = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    componentDidMount = ()=>{
        isAuthenticated();
    }
    

    login = (e) =>{
        e.preventDefault()
        axios.post(BASE_URL+'api/auth/login',{username: this.state.username,password: this.state.password})
        .then(res =>{
            console.log(res);
            localStorage.setItem('token', res.data['token']);
            this.props.history.replace('/business');
        })
        .catch(error =>{
            if(error.response){
                notification("error", error.response['data']['message'])
            }
        })
    };


    //function renders the login component onto the html page
    render() {
        
        return (
            
            <div>
                <Notifications />
                <div className="container">
                <br/><br/><br/><br/><br/><br/>
                    <div className="container col-md-4">

                        <div className="col-md-12 mb-4 mt-0">

                            <form action="#" method="" className="mt-3">
                                <h5 className="text-muted">LOGIN HERE</h5>
                                <hr/>
                                <div className="form-group">
                                    <label >Username</label>
                                    <input type="text" name="username" onChange={e =>this.change(e)} className="form-control" placeholder="Enter Your Username" required/>
                                </div>

                                <div className="form-group">
                                    <label >Password</label>
                                    <input type="password" name="password" onChange={e =>this.change(e)} className="form-control" placeholder="Enter Your Password"/>
                                </div>

                                <div className="align-items-md-end">
                                    <button type="submit" onClick={this.login} className="btn btn-success btn-lg col-md-12">LOGIN</button>

                                </div><br />
                                <Link to="/register" className="page-link">Not Registered?  Click Here.</Link>
                            </form><br/>
                        
                        </div>
                              
                    </div>
                        <br/><br/><br/><br/><br/><br/>
                </div>

            </div>)
                
            }
        };

export default Login;