import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import Routes from '../../helper/Routes';
import axios from 'axios';
// import Notifications from 'react-notify-toast';


describe(<Routes />, () => {

    it('find div', ()=> {
    const wrapper = shallow(<Routes />);
    expect(wrapper.find('div').length).toEqual(1)

    });

})