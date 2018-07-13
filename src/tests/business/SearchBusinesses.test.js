import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import SearchBusinesses from '../../components/business/SearchBusinesses';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { isAuthenticated } from '../../helper/Utils';
import renderer from 'react-test-renderer'

describe(<SearchBusinesses />, () => {
    let wrapper,component;

    wrapper = shallow(<SearchBusinesses />);
    const business1 ={
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
    afterEach(()=>{
        wrapper.setState({
            isAuthenticated:false,
            next_page: 0,
            total_pages:0,
            business_name: '',
            filter: '',
            filter_value: '',
            businesses: [],
            current_page: 0,
            total_businesses: 0,
            next_page: 0,
            previous_page: 0,
            total_pages:0
        })
    })

    beforeEach(() => {
        axios.get.mockImplementation(
            jest.fn(() => Promise.resolve({
                data:{
                    businesses:[business1]
                }
            }))
        )
    });


    it('should change state when change method is called', ()=> {
        wrapper.setState({isAuthenticated:true})
        // console.log(wrapper.instance())
        wrapper.instance().change({target:{name:'business_name', value: 'louisAndSons'}})
        expect(wrapper.instance().state.business_name).toEqual('louisAndSons')

        wrapper.instance().change({target:{name:'filter', value: 'location'}})
        expect(wrapper.instance().state.filter).toEqual('location')

    });

    it('should request next page', async()=>{
        wrapper.setState({
            isAuthenticated:true,
            next_page: 2,
            total_pages:3
        })
        
        await wrapper.instance().Next()
        expect(wrapper.instance().state.businesses.length).toEqual(1)

    })

    it('should request previous page', async()=>{
        wrapper.setState({
            isAuthenticated:true,
            next_page: 2,
            previous_page:1,
            total_pages:3,
            businesses: [business1]
        })

        await wrapper.instance().Previous()
        expect(wrapper.instance().state.businesses.length).toEqual(1)

    })

    it('should search for a business page', async()=>{
        wrapper.setState({
            business_name:'business',
            filter: 'location',
            filter_value:'kampala'
        })
        await wrapper.instance().Search({preventDefault:()=>{}})
        expect(wrapper.instance().state.businesses.length).toEqual(1)
    })

    
    

})