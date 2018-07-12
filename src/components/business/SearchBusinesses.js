import React, {Component} from 'react';
import axios from 'axios';
import { isAuthenticated, notification} from '../../helper/Utils';
import {Redirect} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {BASE_URL} from '../../helper/Url'

export default class SearchBusinesses extends Component{
    // constructor that handles any passed props in case are passed.
    constructor(){
        super();
        this.state={
            business_name:"",
            filter: "",
            filter_value:"",
            businesses:[],
            isAuthenticated: isAuthenticated() ? true : false
            // per_page:"",
            // total_pages:""
        }
    }

    // function handles user input fields to prevent fields from being readonly.
    change = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
        if(e.target.name === 'filter'){
            this.setState({'filter':e.target.value})
        }
    }


    // function handles searching for passed business names from the input field and makes a get request to the api.
    Search = (e) =>{
        e.preventDefault();
        const business_name = this.state.business_name;
        const filter = this.state.filter;
        const filter_value = this.state.filter_value;

        if(business_name === ""){
            notification("error","business name is missing");
        }else if(filter_value.length > 0 && filter === ""){
            notification('error','Select what to filter by');
        }else if(filter && filter_value.length === 0){
            notification('error','make sure You have entered the filter value');
        }
        else{
            // make api call to get all business that match name input in the field and if with any filters.
            axios.get(BASE_URL+'api/businesses/search?q='+business_name+'&filter_type='+filter+'&filter_value='+filter_value,
            {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*', 'origins':"*"}})
            .then(json =>{
            this.setState({'businesses':json.data['businesses'],business_name:"",filter: "",filter_value:""}) 
            
            })
            .catch(error =>{
                if(error.response){
                    notification("error",error.response.data['message'])
                    this.setState({business_name:'',filter:'',filter_value:''})
                }
            })
        }
      
    }

    render(){
        // const { current_page, per_page, businesses } = this.state

        // const pageNumbers = [];
        // if(this.state.businesses.length > 4){
            
        //     for (let i = 1; i <= Math.ceil(this.state.businesses.length / this.state.per_page); i++) {
        //         pageNumbers.push(i);
        //     }
        // }else{
        //     pageNumbers.push(1);
        // }
        
        // const renderPageNumbers = pageNumbers.map(number => {
        // return (
        //     <li className="btn btn-small btn-dark"
        //     key={number}
        //     id={number}
        //     onClick={this.handleClick}>{number}</li>
        //     );
        // });

        return(
            // check whether user is authenticated and if not redirect them to the login page.
            this.state.isAuthenticated ? 
            <div className="container"><br/><br/><br/>
            <Notifications/>
                    <div className="col col-md-12">

                        {/* this is the pagination div */}
                        <div className=" d-flex justify-content-end">

                            {/* { renderPageNumbers } */}

                        </div>
                        {/* endof pagination div */}

                        <div className="row">
                            <div className="col col-md-4 col-12 pr-md-4 col-sm-12 bg-info p-md-4 text-white">
                                <form action="#" method="" className="pl-md-4">
                                        <h5 className="text-muted">SEARCH BUSINESSES</h5>
                                        <hr/>
                                        {/* below is the form for inputs to use for searching businesses */}
                                        <div className="form-group">
                                            <label>Business Name</label>
                                            <input type="text" name="business_name" className="form-control" value={this.state.business_name} placeholder="Enter business name" onChange={e =>this.change(e)} id="name" required/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="text-bold">Filter by location or category</label><br/>
                                            
                                            <select className="form-control" name="filter" onChange={this.change} value={this.state.filter}>
                                            <option value="">Select category or location</option>
                                                <option value="location">location</option>
                                                <option value="category">category</option>
                                            </select><br/>
                                            
                                        </div>
                
                                            <div className="form-group">
                                            <label>Filter Value</label>
                                            <input type="text" name="filter_value" className="form-control" value={this.state.filter_value} placeholder="Enter business name" onChange={e =>this.change(e)} id="filter_value" required/>
                                            </div>
                                        
                                        <div className="align-items-md-end">
                                            <button type="submit" name="search" className="btn btn-primary btn-lg col-md-12" onClick={this.Search}>SEARCH BUSINESS</button>
                                        </div>
                                    </form>
                            </div>
            
                            <div className="col col-md-8 pl-md-4 col-12 mt-0">
                            <div className="row">
                            
                            {this.state.businesses.map(business =>{
                            return(
                                
                                    <div className="col col-md-6 bg-dark border-bottom text-info border-right p-3">                                    
                                        <h6 key={business.id}>Business : <span className="text-white">{business.id}</span></h6>
                                        <h6>Name : <span className="text-bold"> <span className="text-white">{business.business_name}</span></span></h6>
                                        <p>Category :<span className="text-bold"> <span className="text-white">{business.category}</span></span></p>
                                        <p>Location :<span className="text-bold"> <span className="text-white">{business.location}</span></span></p>
                                        <p><span>Description:</span></p><br/>
                                        
                                        
                                        <p className="text-white">{business.description}</p>
                                        
                                    </div>
                                    
                                )})
                            }
                                {/* end of search container */}
                            </div>
                            </div>
                        </div>

                        <br/><br/><br/><br/><br/>
                    </div>
            </div>
            
            : <Redirect to={{pathname:'/login'}}/>
        );
    };
}
