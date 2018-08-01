import React, {Component} from 'react';
import axios from 'axios';
import { isAuthenticated } from '../../helper/Utils';
import {Redirect} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {notification} from '../../helper/Utils'
import all_businesses from '../../images/all_businesses.png'
import {BASE_URL} from '../../helper/Url'
import MyBusinesses from '../business/MyBusinesses'


export default class AllBusinesses extends Component{

    constructor(){
        super()
        this.state = {
            businesses:[],
            review:"",
            reviews:[],
            isAuthenticated: isAuthenticated() ? true : false
        }
    }

    componentDidMount(){
        // load businesses when component is immediately rendered
        this.defaultState();
    }

    // function handles input areas. by deault nothing changes if this function is not present.
    onChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    // function queries businesses to be rendered by the component.
    defaultState = () => {
        // e.preventDefault();
        axios.get(BASE_URL+'api/businesses',
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
        .then(json =>{
            this.setState({'businesses':json['data']['businesses']});
            
        })
        .catch(error => {
            if(error.response){
                notification("error",error.response.data['message'])
            }
        })
    }

    // function is responsible for creating a new review for a clicked business
    addReview = () => {
        const id =this.state.id;
        const review = this.state.review;
        console.log(id, review)
        if(review === ""){
            notification("warning", "Field is empty")
        }else{
            axios.post(BASE_URL+'api/businesses/'+id+'/reviews',{'review':this.state.review},
            {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
            .then((res) => {
                this.setState({'review':""})
                notification("success", res.data['message']);                
            })
            .catch(error => {                
                // this.defaultState();
                if(error.response){
                    notification("error",error.response.data['message'])
                }
            })
        }
    }

    // function sets id to be used by the api call and return that business's reviews
    onReview = (e) => {
        this.setState({'id':e.target.id})
    }

    viewReviews = (e) => {
        const id = e.target.id

        axios.get(BASE_URL+'api/businesses/'+id+'/reviews',
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
        .then((res) => {
            this.setState({'reviews':res.data['reviews']})
        })
        .catch(error => {
            if(error.response){
                notification("error",error.response.data['message'])
                this.setState({'reviews':[]})
            }
        })

    }

    render(){
        
        
        return(
            this.state.isAuthenticated ? 
            <div className="container">
            <Notifications/>

            
            <br/><br/>
                <div className="container col-md-12">
                    <div className="row">

                             {/* Header image -> ALL BUSINESSES */}
                            <div className="col col-md-10 border p-0 mb-3">
                                <img src={all_businesses} className="img" alt=""/>
                            </div>
                       
                        <MyBusinesses 
                            businesses={this.state.businesses}
                            reviews={this.state.reviews}
                            onReview={this.onReview}
                            viewReviews={this.viewReviews}
                            path = 'allbusinesses'
                            addReview = {this.addReview}
                            onChange = {this.onChange}
                            review = {this.state.review}
                        />

                    </div>
                </div>
                
        </div>: <Redirect to={{pathname:'/login'}}/>
        );
    };
}
