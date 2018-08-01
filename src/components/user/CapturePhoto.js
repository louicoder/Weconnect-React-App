import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { userName } from '../../helper/Utils'
import axios from 'axios';
import { notification } from '../../helper/Utils';
import { BASE_URL } from '../../helper/Url'
import Notification from 'react-notify-toast'
import loading from '../../images/loading.gif'


export default class CapturePhoto extends Component {

    state = {
        photo:"",
        display:"none",
        loading:"none"
    }

    componentDidMount() {
        
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = (e) => {
        e.preventDefault();
        console.log(e.target)
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            display:"inline",
            photo: imageSrc,
            loading:"none"
        })
        document.getElementById('photo').src = imageSrc
    };

    upload = (e) => {
        e.preventDefault();
        this.setState({loading:"inline"})
        const formdata = new FormData()
        const username = userName()
        const API_KEY = 'QRsG6XPIJ_ZZTDZpHMWc9cySg9M'
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/weconnect/image/upload'
        const CLOUDINARY_PRESET_URL = 'ultzvzhn'
        
        formdata.append('file', this.state.photo)
        formdata.append('upload_preset', CLOUDINARY_PRESET_URL)
        formdata.append('api_key', API_KEY)
        // console.log(this.state.photo)
        // axios.post(BASE_URL+'api/auth/upload/'+username, formdata)
        axios({
            url: CLOUDINARY_URL, method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formdata,
            upload_preset: CLOUDINARY_PRESET_URL
        })
        .then(res => {
            console.log(res)
            let url = res.data['url']
            axios.post(BASE_URL + 'api/auth/photo/' + username, { 'image_url': url })
            .then(res => {
                notification('success', res.data['message'])
                this.setState({ 
                    photo: url,
                    display:"none",
                    loading:"none"
                })
            })
            .catch(error => {
                this.setState({loading:"none"})
                if (error.response)
                    notification('error', error.response.data['message'])
            })

        })

        .catch(error => {
            // if(error.response)
            //     notification('error', error.response.data['message'])
            console.log(error.response)
        })
    }
    

    render() {

        return (

            <div className="container justify-content-center">
            <Notification/>
                <div className="row justify-content-center mt-md-5 border">
                    
                    {/* <h1 className="mt-1">TAKE A PHOTO AS YOUR PROFILE PHOTO</h1> */}
                    
                    <div className="col col-md-6">
                        <Webcam
                        audio={false}
                        height={512}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        width={480}
                        video={true}
                        />
                    </div>
            
            
                    <div className="col col-md-auto justify-content-middle">
                        <br/><br/><br/><br/><br/>
                        <img className="" src="" id="photo" alt="" />
                    </div>

                </div>
                
                <div className="row justify-content-center pt-3 mb-5">
                    <button className="btn btn-lg btn-primary" onClick={this.capture}>Capture photo</button>
                    <button className="btn btn-lg btn-primary ml-2" style={{display:this.state.display}} onClick={this.upload}>upload photo</button><br/>

                    <img src={loading} className="ml-3" style={{display:this.state.loading, marginTop:"0px"}}/>
                    <p className="ml-3 text-bold" style={{display:this.state.loading,marginTop:"8px"}}> Uploading image, please wait...</p>
                </div>


               
            </div>

        )
    }
}