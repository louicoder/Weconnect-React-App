import React from 'react';

export const AllbusinessActions = ({ business, onReview, viewReviews }) => (

    <div className="container">
        <div className="row justify-content-end">

            <button type="button" className="btn btn-success ml-md-2" name="review_button" id={business.id} data-target="#review_modal" data-toggle="modal" value={business.id} onClick={onReview}>  Add Review</button>

            <button type="button" className="btn btn-primary ml-md-2" name="pick_reviews" id={business.id} onClick={viewReviews} data-target="#view_reviews" data-toggle="modal">View Reviews</button>

        </div>
    </div>

)
