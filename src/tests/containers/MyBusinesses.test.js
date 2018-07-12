import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import MyBusinesses from '../../containers/MyBusinesses';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { isAuthenticated } from '../../helper/Utils';

describe(<MyBusinesses />, () => {
    let wrapper,component;
    wrapper = shallow(<MemoryRouter><MyBusinesses /></MemoryRouter>);
    component = wrapper.find(MyBusinesses).dive();

    beforeEach(() => {
        
        axios.get.mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                data:{
                    'businesses':[{
                        "Created By": "business creator", 
                        "Date Created": "Mon, 01 Apr 2017 9:10:00 GMT", 
                        "Last Modified": "Mon, 01 Apr 2017 9:11:00 GMT",       
                        "category": "categoryx", 
                        "description": "businessx description", 
                        "id": 1, 
                        "location": "locationx", 
                        "name": "businessx", 
                        "user_id": 1
                    }]
                }
            }))
        )
    });
    afterEach(() => {

    })

    it('redirect when not logged in', ()=> {
        // component.setState({isAuthenticated:true})
        // console.log(component.find('textarea[name="description"]'))
        // let spy = jest.spyOn(component.instance(), 'registerBusiness')
        
        // component.find('input[name="business_name"]').simulate('change', {target: {value:'louis'}})
        // component.find('input[name="location"]').simulate('change', {target: {value:'location'}})
        // component.find('input[name="category"]').simulate('change', {target: {value:'category'}})
        // component.find('textarea[name="description"]').simulate('change', {target: {value:'description'}})
        // component.find('button[type="submit"]').simulate('click', {preventDefault: jest.fn()});
        // expect(spy).toHaveBeenCalled();
        // expect(component.state().isAuthenticated).toEqual(false)
        
    });

    it('deletes a business', () => {
        component.setState({name:'business',location:'kampala',category:'technology',description:'a software compnay since 2000'})
        axios.put.mockImplementation(
            jest.fn(() => Promise.resolve({
                data:{
                    'message':'business successfully updated'
                }
            }))
        )
        
    })

})