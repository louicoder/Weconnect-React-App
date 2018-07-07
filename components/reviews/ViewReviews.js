import React, {Component} from 'react';
// import 'isAuthenticated' from '../../helper/utils';
import axios from 'axios';
import { isAuthenticated } from '../../helper/Utils';
import {Redirect} from 'react-router-dom';

export default class reviews extends Component{

    componentWillMount(){
        // getBusinesses();
        axios.get('http://127.0.0.1:5000/api/businesses',
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
        .then(json =>{
            this.setState({'businesses':json['data']['businesses']});
            // console.log(this.state)
        })
        .catch(error =>{
            console.log(error['data']);
        })
    }

    constructor(props){
        super(props);
        this.state={
            businesses:[]
        }
    }

    defaultState = () =>{

    }

    change = e =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    render(){
        
        return(
            isAuthenticated() ? 
            <div className="container">
            <br/><br/>
                <div className="container col-md-12">
                    <div className="row">

                        <div className="col col-md-6 col-12 pr-md-4 col-sm-12">
                            <h5 className="text-muted">ALL BUSINESSES reviews LISTED BELOW </h5><hr/>
                            <p> All Your Businesses that are registered by you the application will appear on this page. 
                                On the right you can look through all the available business you have so far registered by you
                            </p>
                        </div>
        
                        <div className="col col-md-6 mb-4 border-left pl-md-4 col-12 mt-4 mt-md-0">
                            
                            {this.state.businesses.map(business =>{
                                return(
                                    <div className="col-12 bg-dark text-white p-3 mb-md-2">                                    
                                        <h6 key={business.id}>BUSINESS : {business.id}</h6>
                                        <h6>NAME : <span className="text-bold">{business.business_name}</span></h6>
                                        <p>Category :<span className="text-bold">{business.category}</span></p>
                                        <p>Location :<span className="text-bold">{business.location}</span></p>
                                        <p><span>Description:</span>
                                        {business.description}</p>
                                        <hr style={{border:"0.5px solid white"}}/>

                                        <div className="row">
                                        {/* <button type="button" className="btn btn-primary ml-md-2" name="Edit" id={business.id}><span className="fa fa-pencil"> </span>  Edit</button>
                                        <button type="button" className="btn btn-danger ml-md-2" onClick={this.onDelete} name="Edit" id={business.id}><span className="fa fa-trash"> </span>  Delete</button> */}
                                        <button type="button" className="btn btn-success ml-md-2" name="Edit" id={business.id}><span className="fa fa-thumbs-up"> </span>  Review</button>
                                        </div>
                                        
                                    </div>
                                    )})
                                }
                            
                        </div>
                        
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>: <Redirect to={{pathname:'/login'}}/>
        );
    };
}
