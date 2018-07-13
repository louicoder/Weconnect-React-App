import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import BusinessRegistration from '../../components/business/BusinessRegistration';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { isAuthenticated } from '../../helper/Utils';

describe(<BusinessRegistration />, () => {
    let wrapper,component;
    wrapper = shallow(<MemoryRouter><BusinessRegistration /></MemoryRouter>);
    component = wrapper.find(BusinessRegistration).dive();

    beforeEach(() => {
        
        axios.post.mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                data:{
                    message:'business successfully created'
                }
            }))
        )
    });
    afterEach(() => {

    })

    it('renders proper elements on the page', ()=> {
        component.setState({isAuthenticated:true})
        let spy = jest.spyOn(component.instance(), 'registerBusiness')
        
        component.find('input[name="business_name"]').simulate('change', {target: {value:'louis'}})
        component.find('input[name="location"]').simulate('change', {target: {value:'location'}})
        component.find('input[name="category"]').simulate('change', {target: {value:'category'}})
        component.find('textarea[name="description"]').simulate('change', {target: {value:'description'}})
        component.find('button[type="submit"]').simulate('click', {preventDefault: jest.fn()});
        expect(spy).toHaveBeenCalled();
        
    });

    it('resets state values to empty strings', ()=> {
        expect(component.state().business_name.length).toEqual(0)
        expect(component.state().location.length).toEqual(0)
        expect(component.state().category.length).toEqual(0)
        expect(component.state().description.length).toEqual(0)
        expect(component.state().isAuthenticated).toEqual(true)
    });
    

})