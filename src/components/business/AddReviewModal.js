import React from 'react'
import Notifications from 'react-notify-toast'

export const AddReviewModal = ({ onChange, review, addReview }) => (

    <div className="modal fade" id="review_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <Notifications />
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">

                <div className="modal-body">
                    <form action="#" method="" className="" id="review_form">
                        <h5 className="text-muted">ADD REVIEW FOR THIS BUSINESS</h5>
                        <hr />

                        <div className="form-group">
                            <textarea name="review" onChange={onChange} className="form-control" rows="3" placeholder="Enter brief description about your Business" value={review}>{review}
                            </textarea>
                        </div>


                    </form>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" name="add_review" className="btn btn-primary" onClick={addReview}>Review Business</button>

                </div>
            </div>
        </div>
    </div>
)