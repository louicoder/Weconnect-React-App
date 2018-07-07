import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Registration from '../Components/user/UserRegistration';
import Login from '../Components/user/Login';
import BusinessRegistration from '../Components/business/BusinessRegistration'
import AllBusinesses from '../Components/business/AllBusinesses';
import DeleteBusiness from '../Components/business/DeleteBusiness';
import EditBusiness from '../Components/business/EditBusiness';
import MyBusinesses from '../containers/MyBusinesses';
import SearchBusinesses from '../Components/business/SearchBusinesses';
import reviews from '../Components/reviews/Viewreviews';
import Profile from '../Components/user/Profile';


const Routes = () =>(

    <div>
        <Switch>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/business" component={BusinessRegistration}/>
            <Route exact path="/allbusinesses" component={AllBusinesses}/>
            <Route exact path="/deletebusiness" component={DeleteBusiness}/>
            <Route eaxct path="/editbusiness" component={EditBusiness}/>
            <Route eaxct path="/mybusinesses" component={MyBusinesses}/>
            <Route exact path="/search" component={SearchBusinesses}/>
            <Route exact path="/reviews" component={reviews}/>
            <Route exact path="/profile" component={Profile}/>

        </Switch>
    </div>
);

export default Routes;