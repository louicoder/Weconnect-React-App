import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import Header from '../../components/common/Header';
import axios from 'axios';

describe(<Header />, () => {
    let wrapper,component;
    wrapper = shallow(<MemoryRouter><Header /></MemoryRouter>);
    component = wrapper.find(Header).dive();


    it('renders proper elements on the page', ()=> {
        
        // component.find('div').length.toBe(1)
        expect(component.find('div').length).toBe(5)
        // console.log(wrapper)
        // component.find('input[name="second_password"]')
        
    });

})