import React, {Component} from 'react';

export default class DeleteBusiness extends Component{
    render(){
        return(
            <div className="container">
                <div className="container col-md-6 bg-dark text-white p-3 text-center">
                    <form action="#" method="" className="pl-md-4">
                        <h5 className="text-muted">DELETE BUSINESS</h5>
                        <hr className="text-white"/>
                        <div className="form-group">
                            <label>Business Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Enter business name"/>
                        </div>
                        
                        <div className="form-group">
                            <label>Enter Location</label>
                            <input type="text" className="form-control" name="location" placeholder="Enter business location"/>
                        </div>

                        <div className="form-group">
                            <label>Enter Category</label>
                            <input type="text" className="form-control" name="category" placeholder="Enter business category"/>
                        </div>

                        <div className="form-group">
                            <label>Enter Description</label>
                            <input type="text" className="form-control" name="description" placeholder="Enter business description"/>
                        </div>
                        
                        
                        <div className="align-items-md-end">
                            <button type="submit" name="delete_business" className="btn btn-success btn-lg">Delete</button>
                        </div>
                    </form>
                </div>
                <br/>
                <br/>
            </div>
        );
    };
}