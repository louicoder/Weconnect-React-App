import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import Login from '../../components/user/Login';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';


describe(<Login />, () => {
    let wrapper,component;
    //  wrapper = mount(<MemoryRouter><Login /></MemoryRouter>);
    // const mock = new MockAdapter(axios);
        

    beforeEach(() => {
        wrapper = shallow(
            <MemoryRouter><Login /></MemoryRouter>
        );
        component = wrapper.find(Login).dive();
    });
    afterEach(() => {

    })
    it('should call login on button click', ()=> {
        axios.post.mockImplementationOnce(
            jest.fn(() => Promise.resolve({
                data:{
                    token: 'hsdjhbsjhdbs',
                    message:'successfully logged in'
                }
            }))
        )
        let spy = jest.spyOn(component.instance(), 'login')
        // console.log(component.instance())
        component.find('input[name="username"]').simulate('change', {target: {value:'username'}})
        component.find('input[name="password"]').simulate('change', {target: {value:'password'}})
        component.find('button[type="submit"]').simulate('click', {preventDefault: jest.fn()});
        expect(spy).toHaveBeenCalled();
    });


})