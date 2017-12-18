import React from 'react';
import { mount } from 'enzyme';
import Footer from './../footer_component';
import { Provider } from 'react-redux';
import store from './../../store';

const wrapper = mount(
    <Provider store={store} >
            <Footer  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions