import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Registration from '../components/user/UserRegistration';
import Login from '../components/user/Login';
import BusinessRegistration from '../components/business/BusinessRegistration'
import AllBusinesses from '../components/business/AllBusinesses';
import MyBusinesses from '../containers/MyBusinesses';
import SearchBusinesses from '../components/business/SearchBusinesses';
import Profile from '../components/user/Profile';
import ResetPassword from '../components/user/ResetPassword'
import CapturePhoto from '../components/user/CapturePhoto';


const Routes = () =>(

    <div>
        <Switch>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/business" component={BusinessRegistration}/>
            <Route exact path="/allbusinesses" component={AllBusinesses}/>
            <Route eaxct path="/mybusinesses" component={MyBusinesses}/>
            <Route exact path="/search" component={SearchBusinesses}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/reset-password-email/:username" component={ResetPassword}/>
            <Route exact path="/reset-password-email/" component={Login}/>
            <Route exact path="/reset-password-email" component={Login}/>
            <Route exact path="/capture" component={CapturePhoto}/>

        </Switch>
    </div>
);

export default Routes;