import React from 'react';
import Notifications from 'react-notify-toast'

export const EditBusinessModal = ({onChange, name, location, category, description,onUpdateBusiness}) => (
    <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
                    <Notifications />
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            
                            <div className="modal-body">
                            <form action="#" method="" className="">
                                <h5 className="text-muted">UPDATE YOUR BUSINESS</h5>
                                <hr/>
                                <div className="form-group">
                                    <label>Business Name</label>
                                    <input type="text" name="name" onChange={onChange} className="form-control" value={name} placeholder="Enter new business name" required/>
                                </div>
                                
                                <div className="form-group">
                                    <label>Enter new location</label>
                                    <input type="text" name="location" onChange={onChange} className="form-control" value={location}  placeholder="Enter new business location"/>
                                </div>

                                <div className="form-group">
                                    <label>Enter new Category</label>
                                    <input type="text" name="category" onChange={onChange} className="form-control" value={category}  placeholder="Enter new Business category"/>
                                </div>

                                <div className="form-group">
                                    <label>Enter new description</label>
                                    <textarea name="description" onChange={onChange} className="form-control" value={description} rows="3" placeholder="Enter new description about your Business"></textarea>
                                </div>
                                
                                
                            </form>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={onUpdateBusiness}>Update Business</button>
                                
                            </div>
                            </div>
                        </div>
                    </div>
)