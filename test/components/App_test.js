import React from 'react'
import { shallow } from 'enzyme'

import App from '../../app/App'

// Enzyme render test docs: https://airbnb.io/enzyme/docs/api
describe('<App />', () => {
  it('renders the component', () => {
    const app = shallow(<App />)

    expect(app.exists()).to.equal(true)
  })

})
