import { render } from '@redwoodjs/testing/web'

import CardListOfUser from './CardListOfUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CardList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CardListOfUser />)
    }).not.toThrow()
  })
})
