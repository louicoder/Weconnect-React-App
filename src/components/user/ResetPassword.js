import React, { Component } from 'react';
import Notification from 'react-notify-toast';
import { notification } from '../../helper/Utils';
import axios from 'axios';
import { BASE_URL } from '../../helper/Url';

export default class ResetPassword extends Component {

    state = {
        username: '',
        newPassword: '',
        repeatedPassword: '',
        secret_code: ''
    }

    // function handles input areas. by deault nothing changes if this function is not present.
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        // console.log(this.props.match.params.username)
        // console.log(this.state)
        
    }

    componentWillMount() {
        // console.log(this.state)
        // console.log(this.props.match.params.username)
    }

    onUpdate = (e) => {
        e.preventDefault()

        if (this.state.secret_code.length === 0) {
            notification('error', 'Secret code field should not be left empty')
        }
        else if (this.state.newPassword.length === 0 && this.state.repeatedPassword.length === 0) {
            document.getElementById('newPassword').value = ""
            document.getElementById('repeatedPassword').value = ""
            notification('error', 'Password fields are empty')
        }
        else if (this.state.newPassword.length === 0 || this.state.repeatedPassword.length === 0) {
            document.getElementById('newPassword').value = ""
            document.getElementById('repeatedPassword').value = ""
            notification('error', 'one of the passwords fileds is empty')
        }
        else if (this.state.newPassword.length < 5 || this.state.repeatedPassword.length < 5) {
            document.getElementById('newPassword').value = ""
            document.getElementById('repeatedPassword').value = ""
            notification('error', 'one of the passwords is too short, should be 5 characters or more')
        }
        else if (this.state.newPassword !== this.state.repeatedPassword && (this.state.newPassword.length > 0 && this.state.newPassword.length > 0)) {
            document.getElementById('newPassword').value = ""
            document.getElementById('repeatedPassword').value = ""
            notification('error', 'passwords do not match')
        }
        else {
            const username = this.props.match.params.username
            axios.put(BASE_URL + 'api/auth/reset-password-email/' + username, { password: this.state.newPassword, secret_code:this.state.secret_code })
            .then(res => {
                this.props.history.replace('/login')
                notification('success', res.data['message'])
                this.setState({
                    username: '',
                    newPassword: '',
                    repeatedPassword: '',
                    secret_code: ''
                })
                
            })
            .catch(error => {
                if(error.response){
                    notification('error', error.response.data['message'])
                    this.setState({newPassword:'', repeatedPassword:'', secret_code:''})
                    document.getElementById('newPassword').value = ""
                    document.getElementById('repeatedPassword').value = ""
                }
            })
        }

    }


    render() {
        
        return (
            <div className="row justify-content-center pt-md-5">
                <Notification />
                <div className="col col-md-3 align-middle mt-5 pt-5">

                    <form action="#" method="" className="mt-3">
                        <h5 className="text-muted">RESET YOUR PASSWORD HERE...</h5>
                        <hr />

                        <div className="form-group">
                            <label >Secret code</label>
                            <input type="text" name="secret_code" onChange={this.onChange} className="form-control" placeholder="Enter secret code sent to your email" required />
                        </div>

                        <div className="form-group">
                            <label >New password</label>
                            <input type="password" name="newPassword" id="newPassword" onChange={this.onChange} className="form-control" placeholder="Enter your new password" required />
                        </div>

                        <div className="form-group">
                            <label >Repeat password</label>
                            <input type="password" name="repeatedPassword" id="repeatedPassword" onChange={this.onChange} className="form-control" placeholder="Enter password again" required />
                        </div>

                        <div className="align-items-md-end">
                            <button type="submit" onClick={this.onUpdate} className="btn btn-success btn-lg col-md-12">UPDATE PASSWORD</button>

                        </div><br />


                        <div className="row justify-content-center">

                        </div>

                    </form><br />

                </div>

            </div>
        );
    };
}