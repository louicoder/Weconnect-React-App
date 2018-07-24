import React from 'react';
import Notifications from 'react-notify-toast';
import { MyBusinessActions } from '../business/MyBusinessActions'
import {AllbusinessActions} from '../business/AllBusinessActions'
import {EditBusinessModal} from '../business/EditBusinessModal'
import {AddReviewModal} from '../business/AddReviewModal'
import {ViewReviewsModal} from '../business/ViewReviewsModal'


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
    viewreviews,
    viewReviews,
    path = ''
}) => (
        <div className="container">
        <Notifications />
        <br/><br/>
            <div className="container col-md-12">
                <div className="row">

                    {path === '' ?
                    <div className="col col-md-10 border p-0 mb-3">
                       {/* Header image -> YOUR BUSINESSES */}
                        <img src={register_business} className="img" alt=""/>
                      
                    </div>:''}
                    
                    {/* modal window for editing business */}
                    <EditBusinessModal
                    onChange={onChange}
                    name={name}
                    location={location}
                    category={category}
                    description={description}
                    onUpdateBusiness={onUpdateBusiness}
                    />
                    
                    {/* end of modal window */}

                    {/* modal window for adding new review to business */}

                    <AddReviewModal
                    review={review}
                    onChange={onChange}
                    addReview={addReview}
                    />

                    {/* end of review business modal */}

                    {/* modal window for viewing a business reviews */}

                    <ViewReviewsModal
                    reviews={reviews}
                    />

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
                                        
                                        {path === '' ? 
                                        <MyBusinessActions 
                                            business={business} 
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                            onReview={onReview}
                                            viewreviews={viewreviews}
                                        />
                                        :
                                        <AllbusinessActions 
                                            business = {business}
                                            onReview = {onReview}
                                            addReview= {addReview}
                                            viewReviews = {viewReviews}
                                        />
                                        }
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
