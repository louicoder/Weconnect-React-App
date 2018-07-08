import React, {Component} from 'react';
import axios from 'axios';
import { isAuthenticated } from '../../helper/Utils';
import {Redirect} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {notification} from '../../helper/Utils'
import all_businesses from '../../images/all_businesses.png'

export default class AllBusinesses extends Component{

    constructor(props){
        super(props)
        this.state = {
            businesses:[],
            review:"",
            reviews:[]
        }
    }

    componentWillMount(){
        // load businesses when component is immediately rendered
        this.defaultState();
    }

    // function handles input areas. by deault nothing changes if this function is not present.
    change = e => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    // function queries businesses to be rendered by the component.
    defaultState = () => {
        // e.preventDefault();
        axios.get('http://127.0.0.1:5000/api/businesses',
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
        .then(json =>{
            this.setState({'businesses':json['data']['businesses']});
            // console.log(this.state)
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
        if(review === ""){
            notification("warning", "Field is empty")
        }else{
            axios.post('http://127.0.0.1:5000/api/businesses/'+id+'/reviews',{'review':this.state.review},
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

    viewreviews = (e) => {
        const id = e.target.id

        axios.get('http://127.0.0.1:5000/api/businesses/'+id+'/reviews',
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
        .then((res) => {
            console.log(res.data['reviews'])
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
            isAuthenticated() ? 
            <div className="container">
            <Notifications/>
            <br/><br/>
                <div className="container col-md-12">
                    <div className="row">

                             {/* Header image -> ALL BUSINESSES */}
                            <div className="col col-md-10 border p-0 mb-3">
                                <img src={all_businesses} className="img" alt=""/>
                            </div>
                        
                        {/* Beginning of modal window for adding a new review to business */}
                        <div className="modal fade" id="review_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <Notifications />
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                
                                <div className="modal-body">
                                <form action="#" method="" className="" id="review_form">
                                    <h5 className="text-muted">ADD REVIEW FOR THIS BUSINESS</h5>
                                    <hr/>

                                    <div className="form-group">
                                        <textarea name="review" onChange={e =>this.change(e)} className="form-control" rows="3" placeholder="Enter brief description about your Business" value={this.state.review}>{this.state.review}</textarea>
                                    </div>
                                    
                                </form>
                                    
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={this.addReview}>Review Business</button>
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* End of modal window for adding a new review to business */}

                        {/* beginning of view reviews modal window */}
                        <div className="modal fade" id="view_reviews" tabIndex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="Title">ALL reviews FOR THIS BUSINESS</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {this.state.reviews.map(reviews => {
                                        return(
                                            Object.keys(reviews).length > 0 ?
                                            <div className="card-body">
                                                <h6>REVIEW: {reviews.id}</h6>
                                                <p key={reviews.id}></p>
                                                <p>{reviews.review}</p>
                                                <hr/>
                                            </div> : <div><p>No reviews for this business</p></div>
                                        )
                                    })}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                        {/* End of view reviews modal window */}

                        {/* end of review business modal */}
                        <div className="row col-md-12 mb-4  col-12 mt-4 mt-md-0"><br/><br/>
                        <Notifications />
                        {this.state.businesses.map(business =>{
                            return(
                                
                                    <div className="col col-4 bg-dark text-info border-right p-3 mb-md-2">                                    
                                        <h6 key={business.id}>Business : <span className="text-white">{business.id}</span></h6>
                                        <h6>Name : <span className="text-bold"> <span className="text-white">{business.business_name}</span></span></h6>
                                        <p>Category :<span className="text-bold"> <span className="text-white">{business.category}</span></span></p>
                                        <p>Location :<span className="text-bold"> <span className="text-white">{business.location}</span></span></p>
                                        <p><span>Description:</span></p>
                                        
                                        {/* <hr style={{border:"0.5px solid white"}}/> */}
                                        <span className="text-white">{business.description}</span> <br/> <br/>
                                        
                                        <div className="container"> 
                                        <div className="row justify-content-end">

                                            <button type="button" className="btn btn-success ml-md-2" name="review" id={business.id} data-target="#review_modal" data-toggle="modal" value={business.id} onClick={this.onReview}>  Add Review</button>

                                            <button type="button" className="btn btn-primary ml-md-2" name="pick_reviews" id={business.id} onClick={this.viewreviews} data-target="#view_reviews" data-toggle="modal">View reviews</button>

                                        </div>
                                        </div>
                                        
                                    </div>
                                    
                                )})
                        }

                        </div>
                        {/* end of dynamically created div */}
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>: <Redirect to={{pathname:'/login'}}/>
        );
    };
}
