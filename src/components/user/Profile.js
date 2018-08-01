import React, { Component } from 'react';
import user from '../../images/user.png';
import Notifications from 'react-notify-toast';
import { notification } from '../../helper/Utils';
import axios from 'axios';
import { userName } from '../../helper/Utils'
import { BASE_URL } from '../../helper/Url'
import loading from '../../images/loading.gif'


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            second_password: "",
            photo: "",
            display:"none"
        }
    }

    componentDidMount () {
        let username = userName()
        this.setState({display:"inline"})
        axios.get(BASE_URL + 'api/auth/photo/' + username)
        .then(res => {
            // notification('success', res.data['message'])
            this.setState({ 
                photo: res.data['message'],
                display:"none"
             })
        })
        .catch(error => {
            if (error.response){
                this.setState({ 
                    display:"none"
                 })
                notification('error', error.response.data['message'])
            }
            
        })
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    takePhoto = () => {
        this.props.history.replace('/capture')
    }

    fileSelected = (event) => {
        // this.setState({photo:""})
        
        if(event.target.files[0]){
            this.setState({
                photo: event.target.files[0]
            })
            
        }
        
    }

    fileUpload = (e) => {
        this.setState({display:"inline"})
        e.preventDefault()
        const file = document.getElementById('photo').value
        if (!this.state.photo || file === "") {
            notification('error', 'No file was selected for upload, please select a file')
            this.setState({display:"none"})
        }
        else {
            const formdata = new FormData()
            const username = userName()
            const API_KEY = 'QRsG6XPIJ_ZZTDZpHMWc9cySg9M'
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/weconnect/image/upload'
            const CLOUDINARY_PRESET_URL = 'ultzvzhn'
            // console.log(username)
            formdata.append('file', this.state.photo)
            formdata.append('upload_preset', CLOUDINARY_PRESET_URL)
            formdata.append('api_key', API_KEY)
          
            axios({
                url: CLOUDINARY_URL, method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formdata,
                upload_preset: CLOUDINARY_PRESET_URL
            })
            .then(res => {
                let url = res.data.url
                axios.post(BASE_URL + 'api/auth/photo/' + username, { 'image_url': url })
                .then(res => {
                    notification('success', res.data['message'])
                    this.setState({ photo: url ,display:"none"})
                })
                .catch(error => {
                    if (error.response)
                        notification('error', error.response.data['message'])
                })

            })

            .catch(error => {
                if (error.response)
                    notification('error', error.response.data['message'])
            })

        }
    }

    resetPassword = (e) => {
        e.preventDefault();

        const password = this.state.password
        const second_password = this.state.second_password
        // const second_password = document.getElementById('second_password').value
        this.setState({ 'password': password, 'second_password': second_password });

        if (password === second_password && (password.length > 0 && second_password.length > 0)) {

            axios.put(BASE_URL + 'api/auth/reset-password', { 'password': password },
                { 'headers': { 'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
                .then(res => {
                    this.setState({ 'password': "", 'second_password': "" })
                    localStorage.removeItem('token');
                    this.props.history.replace('/login');
                    notification("success", res.data['message']);
                })
                .catch(error => {
                    notification("error", error.response.data['message']);
                })

        } else if (password === "" || second_password === "") {
            alert("Please fill in both fields")
            this.setState({ 'password': "", 'second_password': "" })
        }
        else {
            notification("error", "Passwords do not match, Try again")
            this.setState({ 'password': "", 'second_password': "" })
        }


    }

    render() {

        return (

            <div className="container">
                <Notifications />
                <div className="col col-md-12 mt-5">
                    <div className="row"><span className="offset-2"><h1 className="text-dark"></h1></span><h1 className="text-info">   {userName()} </h1></div>
                    <div className="row justify-content-center">

                        <div className="col col-md-5 p-0">
                            <img alt="no image to display" src={this.state.photo === "" ? user : this.state.photo} className="img img-thumbnail" alt="" />
                            {/* <img src={`http://127.0.0.1:5000/pulic/images/louis.jpg`} className="img img-thumbnail" alt="" /> */}

                            <form action="" encType="multipart/form-data">
                                <div className="form-group">
                                    <br/>
                                    <input type="file" id="photo" name="photo" onChange={this.fileSelected}></input>
                                    <button className="btn btn-primary mr-2 mt-2" onClick={this.fileUpload}>Upload</button>
                                    <button className="btn btn-primary mr-2 mt-2" onClick={this.takePhoto}>Take</button>

                                </div>
                            </form>

                        </div>

                        
                        <div className="col col-md-4 ml-md-2">

                            <form action="#" method="" className="pl-md-4">
                                <h5 className="text-info">RESET PASSWORD FROM HERE </h5>
                                <hr />

                                <div className="form-group">
                                    <label>New password</label>
                                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.change} className="form-control" placeholder="Enter new password" />
                                </div>

                                <div className="form-group">
                                    <label>Repeat password</label>
                                    <input type="password" id="second_password" name="second_password" value={this.state.second_password} onChange={this.change} className="form-control" placeholder="Repeat new password" />
                                </div>

                                <div className="align-items-md-end">
                                    <button type="submit" onClick={this.resetPassword} className="btn btn-success btn-lg col-md-12">RESET PASSWORD</button>
                                </div><br />
                                <div className="row justify-content-center">
                                <img src={loading} style={{marginTop:"5px", display:this.state.display}}/>
                                <p className="ml-3 text-bold" style={{marginTop:"5px", display:this.state.display}}> Loading profile image, please wait...</p>
                                </div>
                                

                            </form>
                        </div>

                    </div>

                </div><br /><br />
            </div>
        );
    }
}