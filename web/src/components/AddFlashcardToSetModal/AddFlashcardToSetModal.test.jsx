import { render } from '@redwoodjs/testing/web'

import AddFlashcardToSetModal from './AddFlashcardToSetModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddFlashcardToSetModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddFlashcardToSetModal />)
    }).not.toThrow()
  })
})
