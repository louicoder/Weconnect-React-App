import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import Header from '../../components/common/Header';
import axios from 'axios';
import { isUndefined } from 'util';

describe(<Header />, () => {
    let wrapper,component;
    wrapper = mount(<MemoryRouter><Header /></MemoryRouter>);
    // component = wrapper.find(Header).dive();


    it('html elements are rendered', ()=> {
        // expect(wrapper.state.isAuthenticated).toEqual(undefined)
        expect(wrapper.find('div').length).toBe(5)
        expect(wrapper.find('li').length).toBe(1)
        wrapper.setState({isAuthenticated:true})
        expect(wrapper.find('li').length).toBe(1)
        expect(wrapper.find('span').length).toBe(2)
        // console.log(wrapper.state().isAuthenticated)d
    });

})