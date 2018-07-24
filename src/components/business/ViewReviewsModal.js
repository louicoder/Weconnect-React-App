import React from 'react'

export const ViewReviewsModal = ({ reviews }) => (

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
                        return (
                            <div className="card-body" key={index}>
                                <h6>REVIEW: {review.id}</h6>
                                <p key={review.id}></p>
                                <p>{review.review}</p>
                                <hr />
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
)