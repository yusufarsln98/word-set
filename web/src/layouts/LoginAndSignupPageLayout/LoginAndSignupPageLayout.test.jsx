import { render } from '@redwoodjs/testing/web'

import LoginAndSignupPageLayout from './LoginAndSignupPageLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoginAndSignupPageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginAndSignupPageLayout />)
    }).not.toThrow()
  })
})
