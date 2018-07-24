import React, { Component } from 'react';
import axios from 'axios';
import {isAuthenticated} from '../../helper/Utils';
import {Link} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {notification} from '../../helper/Utils';
import {BASE_URL} from '../../helper/Url'
import {ResetPasswordModal} from '../user/ResetPasswordModal'

class Login extends Component {
    
    state = {
        password:"",
        username:"",
        message:"",
        color:""
    };

    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    componentDidMount = ()=>{
        isAuthenticated();
    }
    
    onSendEmail = () => {
        https://weconnect-react-app.herokuapp.com/
        axios.post(BASE_URL+'api/auth/reset-password-email/'+this.state.username)
        .then(res =>{
            this.setState({message:res.data['message'], color:'success',username:''})
            notification('success', this.state.message)
        })
        .catch(error =>{
            if(error.response){
                this.setState({
                    message:error.response['data']['message'],
                    color:'danger',
                    username:''
                })
                notification("error", error.response['data']['message'])
            }
        })

    }

    login = (e) =>{
        e.preventDefault()
        axios.post(BASE_URL+'api/auth/login',{username: this.state.username,password: this.state.password})
        .then(res =>{
            localStorage.setItem('token', res.data['token']);
            this.props.history.replace('/business');
        })
        .catch(error =>{
            if(error.response){
                notification("error", error.response['data']['message'])
            }
        })
    }

    //function renders the login component onto the html page
    render() {
        
        return (
            
            <div>
                <Notifications />
                <div className="container">
                <br/><br/><br/><br/><br/><br/>
                    <div className="container col-md-4">

                        {/* beginning of modal window for password reset */}
                            <ResetPasswordModal
                            onSendEmail = {this.onSendEmail}
                            message = {this.state.message}
                            change = {this.onChange}
                            username = {this.state.username}
                            color = {this.state.color}
                            />
                        {/* end of modal window for password reset*/}

                        <div className="col-md-12 mb-4 mt-0">

                            <form action="#" method="" className="mt-3">
                                <h5 className="text-muted">LOGIN HERE</h5>
                                <hr/>
                                <div className="form-group">
                                    <label >Username</label>
                                    <input type="text" name="username" onChange={this.onChange} className="form-control" placeholder="Enter Your Username" required/>
                                </div>

                                <div className="form-group">
                                    <label >Password</label>
                                    <input type="password" name="password" onChange={this.onChange} className="form-control" placeholder="Enter Your Password"/>
                                </div>

                                <div className="align-items-md-end">
                                    <button type="submit" onClick={this.login} className="btn btn-success btn-lg col-md-12">LOGIN</button>

                                </div><br />
                                

                                <div className="row justify-content-center">
                                <Link to="/register" className="page-link">Not Registered?</Link><br/>
                                <a href="" className="page-link ml-2" data-target="#reset_password" data-toggle="modal">Forgot Password?</a> 
                                </div>
                                
                            </form><br/>
                        
                        </div>
                              
                    </div>
                        <br/><br/><br/><br/><br/><br/>
                </div>

            </div>)
                
            }
        };

export default Login;