import React from 'react';
import Notifications from 'react-notify-toast';

const MyBusinesses = ({ 
    name,
    location,
    category,
    description,
    review,
    reviews,
    businesses,
    isAuthenticated, 
    register_business, 
    onChange, 
    onUpdateBusiness, 
    addReview, 
    onEdit,
    onDelete,
    onReview,
    viewreviews
}) => (
        <div className="container">
        <Notifications />
        <br/><br/>
            <div className="container col-md-12">
                <div className="row">

                    <div className="col col-md-10 border p-0 mb-3">
                       {/* Header image -> YOUR BUSINESSES */}
                        <img src={register_business} className="img" alt=""/>
                      
                    </div>
                    
                    {/* modal window for editing business */}
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

                    {/* end of modal window */}

                    {/* modal window for adding new review to business */}

                    <div className="modal fade" id="review_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <Notifications />
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            
                            <div className="modal-body">
                            <form action="#" method="" className="" id="review_form">
                                <h5 className="text-muted">ADD REVIEW FOR THIS BUSINESS</h5>
                                <hr/>

                                <div className="form-group">
                                    <textarea name="review" onChange={onChange} className="form-control" rows="3" placeholder="Enter brief description about your Business" value={review}>{review}</textarea>
                                </div>
                                
                                
                            </form>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={addReview}>Review Business</button>
                                
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* end of review business modal */}

                    {/* modal window for viewing a business reviews */}

                    <div className="modal fade" id="view_reviews" tabIndex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="Title">ALL reviews FOR THIS BUSINESS</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            {/* dynamic div created for each review */}
                            <div className="modal-body">
                                {reviews.map((review, index) => {
                                    return(
                                        <div className="card-body" key={index}>
                                            <h6>REVIEW: {review.id}</h6>
                                            <p key={review.id}></p>
                                            <p>{review.review}</p>
                                            <hr/>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* end of dynamic divs for each review */}

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* end of modal window for a business viewing reviews */}
                    
                    {/* dynamically created divs */}
                    <div className="row col-md-12 mb-4  col-12 mt-4 mt-md-0">
                        <Notifications />
                        {businesses.map((business, index) =>{
                            return(
                                
                                    <div className="col col-6 bg-dark text-info border-right p-3 mb-md-2">
                                        <h5 key={index}>Business : <span className="text-white">{business.id}</span></h5>
                                        <h5>Name : <span className="text-bold"> <span className="text-white">{business.business_name}</span></span></h5>
                                        <h5>Category :<span className="text-bold"> <span className="text-white">{business.category}</span></span></h5>
                                        <h5>Location :<span className="text-bold"> <span className="text-white">{business.location}</span></span></h5>
                                        <h5><span>Description:</span></h5>
                                        
                                        {/* <hr style={{border:"0.5px solid white"}}/> */}
                                        <span className="text-white">{business.description}</span> <br/> <br/>
                                        
                                        <div className="container"> 
                                        <div className="row justify-content-end">
                                            <button type="button" className="btn btn-primary ml-md-2" onClick={onEdit} id={business.id} style={{zIndex: 100}} data-toggle="modal" data-target="#edit_modal"> Edit</button>

                                            <button type="button" className="btn btn-danger ml-md-2" onClick={onDelete} name="delete" id={business.id}>Delete</button>

                                            <button type="button" className="btn btn-success ml-md-2" name="review" id={business.id} data-target="#review_modal" data-toggle="modal" value={business.id} onClick={onReview}> Add Review</button>

                                            <button type="button" className="btn btn-info ml-md-2" name="pick_reviews" id={business.id} data-target="#view_reviews" data-toggle="modal" value={business.id} onClick={viewreviews}>reviews</button>
                                        </div>
                                        </div>
                                        
                                    </div>
                                    
                                )})
                        }
                        
                    </div>
                    {/* end of dynamically created divs */}
                </div>
                <br/><br/><br/>
            </div>
    </div>
    
)

export default MyBusinesses;
