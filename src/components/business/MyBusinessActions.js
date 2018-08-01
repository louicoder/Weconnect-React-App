import React from 'react';

export const MyBusinessActions = ({business, onEdit, onDelete, onReview, viewreviews}) => (

    <div className="container"> 
    <div className="row justify-content-end">
        <button type="button" className="btn btn-primary ml-md-2" onClick={onEdit} id={business.id} style={{ zIndex: 100 }} data-toggle="modal" data-target="#edit_modal"> 
        <i id={business.id} onClick={onEdit} className="fa fa-pencil"></i></button>

        <button type="button" className="btn btn-danger ml-md-2" onClick={onDelete} name="delete" id={business.id}><i id={business.id} onClick={onDelete} className="fa fa-trash"></i></button>

        <button type="button" className="btn btn-success ml-md-2" name="review" id={business.id} data-target="#review_modal" data-toggle="modal" value={business.id} onClick={onReview}> 
        <i id={business.id} onClick={onReview} className="fa fa-plus"></i> Add Review</button>

        <button type="button" className="btn btn-info ml-md-2" name="pick_reviews" id={business.id} data-target="#view_reviews" data-toggle="modal" value={business.id} onClick={viewreviews}>
        <i id={business.id} onClick={viewreviews} className="fa fa-eye"></i> Reviews</button>

        

    </div>
    </div>

)