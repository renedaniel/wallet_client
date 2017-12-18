import React from 'react';
import { mount } from 'enzyme';
import Tax from './../tax_component';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <Tax  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions