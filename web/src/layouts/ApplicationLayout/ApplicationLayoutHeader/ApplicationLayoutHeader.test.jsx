import { render } from '@redwoodjs/testing/web'

import ApplicationLayoutHeader from './ApplicationLayoutHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ApplicationLayoutHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ApplicationLayoutHeader />)
    }).not.toThrow()
  })
})
