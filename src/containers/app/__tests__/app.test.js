import React from 'react';
import { mount } from 'enzyme';
import App from './../app_container';
import { Provider } from 'react-redux';
import store from './../../../store';
import Nav from './../../../components/nav_component';

const wrapper = mount(
    <Provider store={store} >
            <App  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions