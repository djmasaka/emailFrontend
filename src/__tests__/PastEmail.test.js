import React from 'react'
import {shallow} from 'enzyme'
import PastEmail from '../components/PastEmail'
import setup from '../setupTest'


//unit test are very slow with jest/enzyme because 
//it makes it own dom to test applications
it('<PastEmail /> renders correctly', () => {
    const wrapper = shallow(<PastEmail />)
    expect(wrapper).toMatchSnapshot()
})