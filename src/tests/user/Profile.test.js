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

    beforeEach(() => {
        
        // axios.post.mockImplementationOnce(
        //     jest.fn(() => Promise.resolve({
        //         data:{
        //             message:'password successfully changed'
        //         }
        //     }))
        // )
    });
    afterEach(() => {

    })

    it('renders proper elements on the page', ()=> {
        // const notif = notification("success", "password successfully changed")

        // localStorage.setItem('token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoibG91aXNhIiwiZXhwIjoxNTMxMDgzMDA3LCJpZCI6MTIsInVzZXJuYW1lIjoibG91aXNhIn0.CVZmcaH-6SkqE7bSB6LwD2QWPCmzCyTOdqSCs_PZk90')
        // let spy = jest.spyOn(wrapper, 'resetPassword')
        
        // wrapper.find('input[name="password"]').simulate('change', {target: {value:'password'}})
        // wrapper.find('input[name="second_password"]').simulate('change', {target: {value:'password'}})
        // wrapper.find('button[type="submit"]').simulate('click', {preventDefault: (jest.fn())});
        
        // expect(spy).toHaveBeenCalled();
        // console.log(wrapper)
        expect()

    });

})