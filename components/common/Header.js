import React, {Component} from 'react';
import {isAuthenticated} from '../../helper/Utils';
import {Link} from 'react-router-dom';
import {userName} from '../../helper/Utils'


class Header extends Component{
    // constructor to handle and props from other components when they are eany passed/required.
    constructor(props){
        super(props);
            this.state = {
                // state object that stores authentication variable
                isAuthorised : isAuthenticated()
        }
    }

    // function that renders that navigation bar with either restrictio to menu item or without dependingly on whether a person is logged in or not.
    render(){
        
        let private_links = <div className="" style={{ listStyleType: "none", display:"inline" }}>
                                <li className="nav-item list-inline-item">
                                    <Link className="nav-link" to="/mybusinesses">My businesses</Link>
                                </li>

                                <li className="nav-item list-inline-item">
                                    <Link className="nav-link" to="/allbusinesses">All businesses</Link>
                                </li>

                                <li className="nav-item list-inline-item">
                                    <Link className="nav-link" to="/business">New business</Link>
                                </li>

                                <li className="nav-item list-inline-item">
                                    <Link className="nav-link" to="/search">Search</Link>
                                </li>

                                <li className="nav-item list-inline-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>


                            </div>
        // variant for restricting menu or not basing on authentication.(True means user sees menu and False denies user to see the private menu items/links)
        const restricted_links = isAuthenticated() ? private_links : <div></div>;
       
        return(
            <div className="Nav">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <Link className="navbar-brand" to={{pathname:'/'}}>WeConnect</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navigation">
                        <ul className="navbar-nav mr-auto">
                            {/* render restricted links after checking person is authenticated */}
                            {restricted_links}
                        </ul>
                        
                        <div className="col">
                            <ul className="list-inline">
                                <li className="list-inline-item float-right align-middle float-left text-muted">
                                    <span>
                                    {/* check if person is authenticated or else redirect them to the login page and hide private menu links */}
                                    {isAuthenticated() ? <div> <span className="text-info mr-5 text-bold">welcome:  {userName()}</span><Link className="text-white" to="/" onClick={()=>localStorage.removeItem('token')}><i className="fa fa-unlock text-white"></i> Logout</Link></div> :
                                    <div></div>} 
                                    
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        )
    };

}
// export the component for reuse by other components.
export default Header;