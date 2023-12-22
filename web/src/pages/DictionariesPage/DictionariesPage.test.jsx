import { render } from '@redwoodjs/testing/web'

import DictionariesPage from './DictionariesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DictionariesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DictionariesPage />)
    }).not.toThrow()
  })
})
