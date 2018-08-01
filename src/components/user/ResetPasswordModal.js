import React from 'react';

export const ResetPasswordModal = ({onSendEmail, message, change, email, color, visibility,loading,onClose,onClear, id}) => (
    <div className="modal fade" id="reset_password" tabIndex="-1" role="dialog" aria-labelledby="Title" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="Title">Reset your password here</h5>
                    
                </div>

                <div className="modal-body">

                    <form action="#" method="" className="">
                                        
                        <div className="form-group">
                            <p style={{fontSize:'13.5px'}}>Enter your email address in the field below. We'll email instructions on how to reset your password.</p>
                            <input type="email" id={id}  name="email" onClick={onClear} onChange={change} className="form-control" placeholder="Enter your email address" autoComplete="false"/>
                        </div>

                    </form>

                    { color === 'danger'?  <p className="text-danger">{message}</p>:<p className="text-success">{message}</p>}
                   
                    <div style={{display:visibility}} className="ml-0 justify-content-center">
                        <img src={loading} style={{display:visibility}} alt=""/><span> Sending email please wait...</span>
                    </div>
                </div>
                
                <div className="modal-footer">                    
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={onSendEmail}>Reset Password</button>
                </div>
            </div>
        </div>
    </div>
)