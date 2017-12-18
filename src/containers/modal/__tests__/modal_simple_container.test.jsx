import React from 'react';
import { mount } from 'enzyme';
import ModalSimple from './../modal_simple_container';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <ModalSimple  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions