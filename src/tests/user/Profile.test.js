import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import Profile from '../../components/user/Profile';
import axios from 'axios';
import notification from '../../helper/Utils'

describe(<Profile />, () => {
    let wrapper,component;
    wrapper = shallow(<MemoryRouter><Profile /></MemoryRouter>);
    component = wrapper.find(Profile).dive();

    it('renders proper elements on the page', ()=> {
        axios.put.mockImplementation(
            jest.fn(() => Promise.resolve({
                data:{
                    'message':'business successfully updated'
                }
            }))
        )
        let spy = jest.spyOn(component.instance(), 'resetPassword')
        
        component.find('input[name="password"]').simulate('change', {target: {value:'password'}})
        component.find('input[name="second_password"]').simulate('change', {target: {value:'password'}})
        const submit = component.find('button[type="submit"]').simulate('click', {preventDefault: (jest.fn())});
        
        expect(spy).toHaveBeenCalled();
    });
   

})