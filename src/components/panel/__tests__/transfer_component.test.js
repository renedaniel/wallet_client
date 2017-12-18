import React from 'react';
import { mount } from 'enzyme';
import Transfer from './../transfer_component';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <Transfer  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions