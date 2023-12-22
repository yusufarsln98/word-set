import { render } from '@redwoodjs/testing/web'

import WordsPage from './WordsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WordsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WordsPage />)
    }).not.toThrow()
  })
})
