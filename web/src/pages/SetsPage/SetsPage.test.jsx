import { render } from '@redwoodjs/testing/web'

import SetsPage from './SetsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SetsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetsPage />)
    }).not.toThrow()
  })
})
