import React from 'react'
import {shallow} from 'enzyme'
import SendEmail from '../components/SendEmail'
import setup from '../setupTest'


//unit test are very slow with jest/enzyme because 
//it makes it own dom to test applications
it('<SendMail /> renders correctly', () => {
    const wrapper = shallow(<SendEmail />)
    expect(wrapper).toMatchSnapshot()
})