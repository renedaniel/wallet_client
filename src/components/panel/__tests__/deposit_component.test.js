import React from 'react';
import { mount } from 'enzyme';
import Deposit from './../deposit_component';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <Deposit  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions