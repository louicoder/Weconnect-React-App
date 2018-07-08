import React, {Component} from 'react';
import axios from 'axios';
import MyBusinesses from '../components/business/MyBusinesses';
import { isAuthenticated, notification } from '../helper/Utils'
import {Redirect} from 'react-router-dom';
import register_business from '../images/your_businesses.png'

export default class MyBusinessesContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            businesses:[],
            name:"",
            location:"",
            category:"",
            description:"",
            review:"",
            reviews:[]
        }

    }

    // component handles state before the component is rendered.
    componentWillMount(){
        this.defaultState();
    }

    // function manages the input state especially when a user cannot type into the input area.
    change = e => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    // function manages state when the component is mouted /rendered already
    componentDidMount(){
        this.defaultState();
    }

    // fnuction is responsible for returning all your owned businesses and then updates the state
    defaultState = () =>{
        axios.get('http://127.0.0.1:5000/api/mybusinesses',
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
        .then(json =>{
            this.setState({'businesses':json['data']['businesses']});
            this.props.history.replace('/mybusinesses');
        })
        .catch(error =>{
            if(error.response){
                notification("error", error.response.data['message'])
            }
        })
    }

    // function for adding a review for the selected business
    addReview = () =>{
        const id =this.state.id;
        const review = this.state.review;
        if(review === ""){
            notification("warning", "Field is empty")
        }else{
            axios.post('http://127.0.0.1:5000/api/businesses/'+id+'/reviews',{'review':this.state.review},
            {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
            .then((res) =>{
                this.setState({'review':""})
                notification("success", res.data['message']);
            })
            .catch(error =>{                
                this.defaultState();
                if(error.response){
                    notification("error", error.response.data['message'])
                }
            })
        }
    }

    // function is responsible for updating a business
    onUpdateBusiness = (e) =>{
        e.preventDefault();
        const id = this.state.id
        this.setState({'id':id})
       
        if(this.state.name === ""&& this.state.location === "" && this.state.category === "" && this.state.description === ""){
            notification("warning", "please fill in atleast one of the fields to update")
        }
        else{
            // api call to update the selected business for update.
            axios.put('http://127.0.0.1:5000/api/businesses/'+id,{'name':this.state.name, 'location':this.state.location,'category':this.state.category,'description':this.state.description},
            {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
            .then((res) =>{
                // this.defaultState();
                this.setState({'name':'','location':'','category':'','description':''})
                this.defaultState();
                notification("success", res.data['message'])
            })
            .catch(error =>{                
                this.defaultState();
                if(error.response){
                    notification("error", error.response.data['message'])
                }
            })
        }

    }

    // function sets the id of a business when review button is clicked
    onReview = (e) =>{
        this.setState({'id':e.target.id})
    }

    // function fills the fields on the edit business form with the relevant information relevant to that business
    onEdit = (e) =>{
        const id = e.target.id
        
        this.setState({'id':e.target.id,'name':'','location':'','category':'','description':''})
        axios.get("http://127.0.0.1:5000/api/businesses/"+id,
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*','Origins':'*'}})
        .then(res=>{
            this.setState({
                'id':res.data['businesses']['id'],
                'name':res.data['businesses']['business_name'],
                'location':res.data['businesses']['location'],
                'category':res.data['businesses']['category'],
                'description':res.data['businesses']['description']
            })
           
        })
        .catch(error =>{
            if(error.response){
                notification("error", error.response.data['message'])
            }
        })

    }

    // function handles the process of deleting a business when the delete button is clicked.
    onDelete = (e) => {
        e.preventDefault();
        const id = e.target.id;

        if (window.confirm('Are you sure you want to save this thing into the database?')){
            // make the api call to delete the business with that id.
            axios.delete('http://127.0.0.1:5000/api/businesses/'+id,
            {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
            .then(res=>{
                notification("success", res.data['message']);
                this.setState({'businesses':[]})
                this.defaultState();
            })
            .catch(error =>{
                if(error.response){
                    notification("error", error.response.data['message'])
                }
            })
        }else{
            notification("error", "Nothing was deleted");
        }
        
    }

    viewreviews = (e) => {
        const id = e.target.id

        axios.get('http://127.0.0.1:5000/api/businesses/'+id+'/reviews',
        {'headers':{'x-access-token':localStorage.getItem('token'), 'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
        .then((res) => {
            console.log(res.data['reviews'])
            this.setState({reviews:res.data['reviews']})
        })
        .catch(error => {
            if(error.response){
                notification("error",error.response.data['message'])
                this.setState({'reviews':[]})
            }
        })
    }

    // function renders this component which is resposible for displaying a person's owned businesses
    render(){
              
        return (
            !isAuthenticated ? <Redirect to={{pathname:'/login'}}/> :
            <MyBusinesses 
            register_business={register_business}
            onChange={this.change}
            {...this.state}
            onUpdateBusiness={this.onUpdateBusiness}
            addReview={this.addReview}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            onReview={this.onReview}
            viewreviews={this.viewreviews}
         />
        )
    };
}
