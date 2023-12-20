import { render } from '@redwoodjs/testing/web'

import SetAndFolderLayout from './SetAndFolderLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SetAndFolderLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetAndFolderLayout />)
    }).not.toThrow()
  })
})
