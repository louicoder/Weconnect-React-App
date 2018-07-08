import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import Footer from '../../components/common/Footer';
import axios from 'axios';

describe(<Footer />, () => {
    let wrapper,component;
    wrapper = shallow(<MemoryRouter><Footer /></MemoryRouter>);
    component = wrapper.find(Footer).dive();


    it('renders proper elements on the page', ()=> {
        
        // component.find('div').length.toBe(1)
        expect(component.find('div').length).toBe(1)
        // console.log(wrapper)
        // component.find('input[name="second_password"]')
        
    });

})