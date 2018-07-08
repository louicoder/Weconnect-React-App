import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import BusinessRegistration from '../../components/business/BusinessRegistration';
import axios from 'axios';
// import Notifications from 'react-notify-toast';


describe(<BusinessRegistration />, () => {
    let wrapper,component;
    wrapper = shallow(<BusinessRegistration />);

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

    it('should call registerBusiness on button click', ()=> {
        
        // console.log(component.state());
        // let spy = jest.spyOn(component.instance(), 'registerBusiness')
        wrapper.setState({isAuthenticated:true})
        console.log(wrapper.state.isAuthenticated)

        console.log(wrapper.find("input[name='business_name']"))
        
        // console.log(component.instance())
        // component.find('input[name="name"]').simulate('change', {target: {value:'business'}})
        // component.find('input[name="location"]').simulate('change', {target: {value:'kampala'}})
        // component.find('input[name="category"]').simulate('change', {target: {value:'tech'}})
        // component.find('input[name="description"]').simulate('change', {target: {value:'description'}})
        // component.find('button[type="submit"]').simulate('click', {preventDefault: jest.fn()});
        // expect(spy).toHaveBeenCalled();

    });

    // it('submit a valid form', () => {
        // wrapper.find("input[name='name']").simulate('change', {target: {value: ''}});
        // wrapper.find("input[name='location']").simulate('change', {target: {value: ''}});
        // wrapper.find("select[name='category']").simulate('change', {target: {value: ''}});
    //     wrapper.setState({isAuthenticated:true})
    //    console.log(wrapper.state.isAuthenticated)
        
        // .simulate('change', {target: {name: 'business_name', value: 'business1'}});
    // })


})