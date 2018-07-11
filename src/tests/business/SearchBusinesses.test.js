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
    wrapper = shallow(<MemoryRouter><SearchBusinesses /></MemoryRouter>);
    component = wrapper.find(SearchBusinesses).dive();

    beforeEach(() => {
        
    });

    it('renders proper elements on the page', ()=> {
        
        component.setState({isAuthenticated:true})
        let spy = jest.spyOn(component.instance(), 'Search')
        component.setState({business_name:'business',filter:'location',filter_value:'kampala'})
        
        component.find('input[name="business_name"]').simulate('change', {target: {value:'business 1'}})
        component.find('select[name="filter"]').simulate('change', {target: {value:'location'}})
        component.find('input[name="filter_value"]').simulate('change', {target: {value:'category'}})
        component.find('button[type="submit"]').simulate('click', {preventDefault: jest.fn()});
        expect(spy).toHaveBeenCalled();
        
    });

    it('matches snapshot', () => {
        const filter = component.setState({filter:'location'})
        component.find('select[name="filter"]').simulate('change', {target: {value:filter}})
        const error = component.setState({filter_value:'location',filter:''}) 
        expect(component.state().filter_value).toEqual('')
        expect(component.find('div').length).toEqual(11)
        expect(component.contains('search'))
    })

    
    

})