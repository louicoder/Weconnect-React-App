import jwt_decode from 'jwt-decode';
import {notify} from 'react-notify-toast';

// function to check whether user is authenticated or not.
export function isAuthenticated(){
    const token = localStorage.getItem('token');
    if(token && token.length > 10){
        // console.log(jwt_decode(token)['username'])
        return true;
    }
}

// function to extract the username to be used on the navigation bar
export function userName(){
    const token = localStorage.getItem('token');
    try{
        const username = jwt_decode(token)['username'] || "louis"
        if (username){
            return username;
        }
    }catch(Error){
        const username = "louis"
        return username;
    }
}

// function to handle notification using react-notify
export function notification(message, text){
    let myColor = { background: '#ff0000', text: "#ffffff" };
    if(message === "error"){
        myColor = { background: '#ff0000', text: "#ffffff" };
        notify.show(text,"custom",3000,myColor);
    }
    else if(message === "success"){
        myColor = { background: '#5cb85c', text: "#ffffff" };
        notify.show(text,"custom",3000,myColor);
    }
    else if(message === "warning"){
        myColor = { background: '#ffae42', text: "#ffffff" };
        notify.show(text,"custom",3000,myColor);
    }
}

// export constant variables for use in other files
// export default BASE_URL = 'http://127.0.0.1:5000/';
// export const LOGIN_URL = 'api/auth/login';
// export const REGISTER_URL = 'api/auth/register'
