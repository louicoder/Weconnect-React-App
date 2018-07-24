import React from 'react';

export const ResetPasswordModal = ({onSendEmail, message, change, username, color}) => (
    <div className="modal fade" id="reset_password" tabIndex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="Title">Reset Your Password Here</h5>
                    
                </div>

                <div className="modal-body m-2">

                    <form action="#" method="" className="">
                                        
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" id="username"  name="username" value={username} onChange={change} className="form-control" placeholder="Enter your username"/>
                        </div>

                    </form>

                    { color === 'danger'?
                    <p className="text-danger">{message}</p>
                    :
                    <p className="text-success">{message}</p>
                    }
                    
                </div>
                
               

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={onSendEmail}>Send Link</button>
                </div>
            </div>
        </div>
    </div>
)