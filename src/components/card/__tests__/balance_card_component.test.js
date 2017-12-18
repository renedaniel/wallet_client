import React from 'react';
import { mount } from 'enzyme';
import BalanceCard from './../balance_card_component';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <BalanceCard  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions