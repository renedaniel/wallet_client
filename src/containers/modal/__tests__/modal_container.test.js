import React from 'react';
import { mount } from 'enzyme';
import ModalContainer from './../modal_container';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <ModalContainer  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions