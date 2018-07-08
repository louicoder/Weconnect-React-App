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

    

    // it('should submit a valid form', () => {
    //     const spy = jest.spyOn(UserActions, 'authenticateUser');
    //     wrapper.find(Login).instance().forceUpdate();
    //     axios.post.mockImplementationOnce(
    //         jest.fn(()=> Promise.resolve({ 
    //         data:{
    //             success:true,
    //             token:'#jsddvbsdcby33767ebybce' 
    //             }
    //         }))
    //     )

    // });

    // it('logs in successfully', async () => {
    //     mock.onPost('http:127.0.0.1:5000/api/auth/login').reply(200,
    //         {
    //             "message": "successfully logged in",
    //             "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoibG91aXMiLCJleHAiOjE1MzEwNjIzNzksImlkIjoxLCJ1c2VybmFtZSI6ImxvdWlzIn0.bqFAlu6HbT8FY6T8k7dEFyMSmY9N_FCyXXTBeyEnABY"
    //         }
    //     )

    //     // expect(wrapper.state.username).toEqual('')
    //     let username = wrapper.find('input[name="username"]');
    //     username.simulate('change', {target: {name: 'username', value: 'username'}});
    //     let password = wrapper.find('input[name="password"]');
    //     username.simulate('change', {target: {name: 'password', value: 'randompassword'}});
        
    //     let login = wrapper.find('button[type="submit"]')
    //     await login.simulate('click', {preventDefault: () => {}})
    // });

    // it('renders without crashing', () => {

    // })
    


})