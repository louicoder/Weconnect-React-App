import React, { Component } from 'react';
import axios from 'axios';
import {isAuthenticated} from '../../helper/Utils';
import {Link} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {notification} from '../../helper/Utils';
import {BASE_URL} from '../../helper/Url'
import {ResetPasswordModal} from '../user/ResetPasswordModal'
import loading from '../../images/loading.gif'

class Login extends Component {
    
    state = {
        password:"",
        username:"",
        message:"",
        color:"",
        email:"",
        visibility: "none",
        id : "email"
    };

    onChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onClose = () => {
        this.setState({message:"",email:""})
    }

    componentDidMount = ()=>{
        isAuthenticated();
    }

    onForgotPassword = () => {
        this.setState({message:''})
    }

    onClear = () => {
        this.setState({email:""})
    }
    
    onSendEmail = (e) => {
        e.preventDefault()
        console.log(this.state)
        if (!this.state.email.includes('.') || !this.state.email.includes('@')){
            this.setState({
                message:'The email is invalid, it should include . and @ symbols',
                color:'danger'
            })
            notification('error', 'The email is invalid, it should include a dot and @ symbols')
        }
        else{
            // set the loading image
            this.setState({
                visibility:'inline'
            })
            axios.post(BASE_URL+'api/auth/reset-password-email',{'email':this.state.email})
            .then(res =>{
                this.setState({visibility:"none"})
                document.getElementById('email').value = ''
                this.setState({message:res.data['message'], color:'success',username:'',email:""})
                notification('success', this.state.message)
            })
            .catch(error =>{
                this.setState({visibility:"none"})
                document.getElementById('email').value = ''
                if(error.response){
                    this.setState({message:""})
                    this.setState({
                        message:error.response['data']['message'],
                        color:'danger',
                        username:'',
                        email:""
                    })
                    // console.log(this.state)
                    notification("error", error.response['data']['message'])
                }
            })
            
        }
        this.setState({email:""})
    }

    login = (e) =>{
        e.preventDefault()
        if(this.state.username.length === 0 || this.state.password.length === 0)
            notification('warning', 'Both filled should be filled in, try again')
        else{
            axios.post(BASE_URL+'api/auth/login',{username: this.state.username,password: this.state.password})
            .then(res =>{
                localStorage.setItem('token', res.data['token']);
                this.props.history.replace('/business');
            })
            .catch(error =>{
                if(error.response){
                    document.getElementById('username').value = ''
                    document.getElementById('password').value = ''
                    notification("error", error.response['data']['message'])
                }
            })
        }
        
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
                            color = {this.state.color}
                            visibility = {this.state.visibility}
                            loading = {loading}
                            onClose = {this.onClose}
                            email = {this.state.email}
                            id = {this.state.id}
                            />
                        {/* end of modal window for password reset*/}

                        <div className="col-md-12 mb-4 mt-0">

                            <form action="#" method="" className="mt-3">
                                <h5 className="text-muted">LOGIN HERE</h5>
                                <hr/>
                                <div className="form-group">
                                    <label >Username</label>
                                    <input type="text" name="username" id="username" onChange={this.onChange} className="form-control" placeholder="Enter Your Username" required/>
                                </div>

                                <div className="form-group">
                                    <label >Password</label>
                                    <input type="password" name="password" id="password" onChange={this.onChange} className="form-control" placeholder="Enter Your Password"/>
                                </div>

                                <div className="align-items-md-end">
                                    <button type="submit" onClick={this.login} className="btn btn-success btn-lg col-md-12">LOGIN</button>

                                </div><br />
                                

                                <div className="row justify-content-center">
                                <Link to="/register" className="page-link">Not Registered?</Link><br/>
                                <a href="" className="page-link ml-2" data-target="#reset_password" onClick={this.onForgotPassword} data-toggle="modal">Forgot Password?</a> 
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