import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import AllBusinesses from '../../components/business/AllBusinesses';
import axios from 'axios';
// import Notifications from 'react-notify-toast';


describe(<AllBusinesses />, () => {
    let wrapper,component;
    wrapper = mount(<MemoryRouter><AllBusinesses /></MemoryRouter>);
    // component = wrapper.spyOn(AllBusinesses).dive()
    

    it('should find state undefined', ()=> {
        
    
    });

    it('submit a valid form', () => {
        
    })


})