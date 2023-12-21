import { render } from '@redwoodjs/testing/web'

import CreateSetPage from './CreateSetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateSetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateSetPage />)
    }).not.toThrow()
  })
})
