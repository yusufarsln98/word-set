import { render } from '@redwoodjs/testing/web'

import FoldersPage from './FoldersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FoldersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FoldersPage />)
    }).not.toThrow()
  })
})
