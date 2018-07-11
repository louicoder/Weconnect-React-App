import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import AllBusinesses from '../../components/business/AllBusinesses';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { isAuthenticated } from '../../helper/Utils';

describe(<AllBusinesses />, () => {
    let wrapper,component;

    beforeEach(() => {
        
        axios.get.mockImplementation(
            jest.fn(() => Promise.resolve({
                data:{
                    businesses:[{
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

        wrapper = shallow(<MemoryRouter><AllBusinesses /></MemoryRouter>);
        component = wrapper.find(AllBusinesses).dive();
    });
    

    it('sets authentcation state to false', ()=> {
        component.setState({isAuthenticated:true,
    
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
                },
                {
                    "Created By": "business creator", 
                    "Date Created": "Mon, 01 Apr 2017 9:10:00 GMT", 
                    "Last Modified": "Mon, 01 Apr 2017 9:11:00 GMT",       
                    "category": "categoryy", 
                    "description": "businessy description", 
                    "id": 2, 
                    "location": "locationy", 
                    "name": "businessy", 
                    "user_id": 2
                    }]
        })
        // let spy = jest.spyOn(component.instance(), 'addReview')
        // component.find('textarea').simulate('change', {target: {value:'louis'}})
        // component.find('')
        // expect(component.find)
        // component.find('input[name="location"]').simulate('change', {target: {value:'location'}})
        // component.find('input[name="category"]').simulate('change', {target: {value:'category'}})
        // component.find('textarea[name="description"]').simulate('change', {target: {value:'description'}})
        // component.find('button[name="review"]').simulate('click', {preventDefault: jest.fn()});
        // expect(spy).toHaveBeenCalled();
        // const reviewButton = component.find('.btn-success')
        // reviewButton.simulate('submit')
        // expect(component.find('#review_modal').length).toBe(1)
    });

    it('redirects to login page', ()=> {
        expect(component.state().isAuthenticated).toEqual(false)
        expect(component.find(Redirect).length).toEqual(1)
    })

    

})