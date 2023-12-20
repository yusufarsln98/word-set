import { render } from '@redwoodjs/testing/web'

import Dictionary from './Dictionary'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Dictionary', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Dictionary />)
    }).not.toThrow()
  })
})
