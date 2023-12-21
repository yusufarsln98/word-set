import { render } from '@redwoodjs/testing/web'

import SetPage from './SetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetPage />)
    }).not.toThrow()
  })
})
