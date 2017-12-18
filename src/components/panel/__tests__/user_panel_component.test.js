import React from 'react';
import { mount } from 'enzyme';
import UserPanel from './../user_panel_component';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <UserPanel  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});

//TODO more assertions