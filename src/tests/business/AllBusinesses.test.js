import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import AllBusinesses from '../../components/business/AllBusinesses';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { isAuthenticated } from '../../helper/Utils';

describe(<AllBusinesses />, () => {
    let wrapper,business;
    business = {
                    "Created By": "business creator", 
                    "Date Created": "Mon, 01 Apr 2017 9:10:00 GMT", 
                    "Last Modified": "Mon, 01 Apr 2017 9:11:00 GMT",       
                    "category": "categoryx", 
                    "description": "businessx description", 
                    "id": 1, 
                    "location": "locationx", 
                    "name": "businessx", 
                    "user_id": 1
                }


    beforeEach(() => {
        
        axios.get.mockImplementation(
            jest.fn(() => Promise.resolve({
                data:{
                    businesses:[business]
                }
            }))
        )


        wrapper = shallow(<AllBusinesses />);
        
    });
    
    it('check that it redirects', ()=> {
        expect(wrapper.find(Redirect).length).toEqual(1)
    });

    it('checks that authentcation is set to false', ()=> {
        expect(wrapper.instance().state.isAuthenticated).toEqual(false)
    });

    it('change the state isauthenticated to true', ()=> {
        wrapper.setState({isAuthenticated:true})
        expect(wrapper.instance().state.isAuthenticated).toEqual(true)
    })

    it('should change state on change event', async ()=> {
        // wrapper.setState({isAuthenticated:true})
        // const review = wrapper.find('textarea[name="review"]').simulate(
        //     'change', {
        //         target: {
        //             value:'this is a review',
        //             name: 'review'
        //         },
        //     }
        // )
        // wrapper.instance().change()
        // expect(wrapper.state().review).toEqual('this is a review')
        
    })

    it('it should add a review to a business', async () => {
        
    })


})