import React from 'react';
import {shallow} from 'enzyme'
import ToDoItem from './ToDoItem'
import {expect} from 'chai'

describe('<ToDoItem />', () => {
    it('renders text', () => {
        const wrapper = shallow(<ToDoItem id={1} text={'Lorem ipsum'} />)
        expect(wrapper.find('div').text()).to.contain('Lorem ipsum')
    })
})





















