import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import UserRegistration from '../../components/user/UserRegistration';
import axios from 'axios';

describe(<UserRegistration />, () => {
    let wrapper,component;
    wrapper = shallow(<MemoryRouter><UserRegistration /></MemoryRouter>);
    component = wrapper.find(UserRegistration).dive();

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
        
        let spy = jest.spyOn(component.instance(), 'onSubmit')
        
        component.find('input[name="username"]').simulate('change', {target: {value:'louis'}})
        component.find('input[name="email"]').simulate('change', {target: {value:'louis@andela.com'}})
        component.find('input[name="password"]').simulate('change', {target: {value:'password'}})
        component.find('input[name="rpassword"]').simulate('change', {target: {value:'password'}})
        component.find('button[type="submit"]').simulate('click', {preventDefault: jest.fn()});
        expect(spy).toHaveBeenCalled();

    });

    

})