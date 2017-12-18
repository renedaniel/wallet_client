import React from 'react';
import { mount } from 'enzyme';
import Spinner from './../spinner_container';
import { Provider } from 'react-redux';
import store from './../../../store';

const wrapper = mount(
    <Provider store={store} >
            <Spinner  />
    </Provider>
);

it('renders without crashing', () => {
    expect(wrapper);
});
