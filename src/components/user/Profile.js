import React, {Component} from 'react';
import user from '../../images/user.png';
import Notifications from 'react-notify-toast';
import {notification} from '../../helper/Utils';
import axios from 'axios';
import {userName} from '../../helper/Utils'

export default  class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            password:"",
            second_password:""
        }
    }

    change = e =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    resetPassword = (e) =>{
        e.preventDefault();
        
        // const password = document.getElementById('password').value
        const password = this.state.password
        const second_password = this.state.second_password
        // const second_password = document.getElementById('second_password').value
        this.setState({'password':password,'second_password':second_password});
       
        if(password === second_password && (password.length > 0 && second_password.length > 0)){
            console.log(password,second_password)
            axios.put('http://127.0.0.1:5000/api/auth/reset-password',{'password':password},
            {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
            .then(res=>{
                this.setState({'password':"",'second_password':""})
                localStorage.removeItem('token');
                this.props.history.replace('/login');
                notification("success", res.data['message']);
            })
            .catch(error =>{
                notification("error",error.response.data['message']);
            })

        }else if(password === "" || second_password === ""){
            this.setState({'password':"",'second_password':""})
            
            // notification("error", "Please fill in both fields")
        }
        else{
           this.setState({'password':"",'second_password':""})
        //    notification("error", "Passwords do not match, Try again")
        }
        

    }

    render(){
        return(
            <div className="container">
            <Notifications/>
                <br/><br/><br/><br/><br/>
                
                <div className="col col-md-12">
                <div className="row pl-3"><span className="offset-2"><h1 className="text-dark">Username: </h1></span><h1 className="text-info">  [ {userName()} ]</h1></div>
                <div  className="row justify-content-center">
                    
                    <div  className="col col-md-5 p-0">
                        <img src={user} className="img img-thumbnail" alt=""/>
                    </div>
                
                    <div  className="col col-md-4 ml-md-2">
                        
                    <form action="#" method="" className="pl-md-4">
                                    <h5 className="text-info">RESET PASSWORD FROM HERE </h5>
                                    <hr />
                                    
                                    <div className="form-group">
                                        <label>New password</label>
                                        <input type="password" id="password"  name="password" value={this.state.password} onChange={this.change} className="form-control" placeholder="Enter new password" />
                                    </div>

                                    <div className="form-group">
                                        <label>Repeat password</label>
                                        <input type="password" id="second_password"  name="second_password" value={this.state.second_password} onChange={this.change} className="form-control" placeholder="Repeat new password" />
                                    </div>

                                    

                                    <div className="align-items-md-end">
                                        <button type="submit" onClick={this.resetPassword } className="btn btn-success btn-lg col-md-12">RESET PASSWORD</button>
                                    </div><br />
                                    
                                </form>
                        
                    </div>
                
                </div>
                
                </div><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        );
    }
}