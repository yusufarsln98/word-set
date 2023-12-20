import { render } from '@redwoodjs/testing/web'

import FolderPage from './FolderPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FolderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FolderPage />)
    }).not.toThrow()
  })
})
