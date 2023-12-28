import { render } from '@redwoodjs/testing/web'

import SetCreatePage from './SetCreatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SetCreatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetCreatePage />)
    }).not.toThrow()
  })
})
