import {
  flashCards,
  flashCard,
  createFlashCard,
  updateFlashCard,
  deleteFlashCard,
} from './flashCards'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('flashCards', () => {
  scenario('returns all flashCards', async (scenario) => {
    const result = await flashCards()

    expect(result.length).toEqual(Object.keys(scenario.flashCard).length)
  })

  scenario('returns a single flashCard', async (scenario) => {
    const result = await flashCard({ id: scenario.flashCard.one.id })

    expect(result).toEqual(scenario.flashCard.one)
  })

  scenario('creates a flashCard', async (scenario) => {
    const result = await createFlashCard({
      input: {
        term: 'String',
        cardId: scenario.flashCard.two.cardId,
        setId: scenario.flashCard.two.setId,
      },
    })

    expect(result.term).toEqual('String')
    expect(result.cardId).toEqual(scenario.flashCard.two.cardId)
    expect(result.setId).toEqual(scenario.flashCard.two.setId)
  })

  scenario('updates a flashCard', async (scenario) => {
    const original = await flashCard({
      id: scenario.flashCard.one.id,
    })
    const result = await updateFlashCard({
      id: original.id,
      input: { term: 'String2' },
    })

    expect(result.term).toEqual('String2')
  })

  scenario('deletes a flashCard', async (scenario) => {
    const original = await deleteFlashCard({
      id: scenario.flashCard.one.id,
    })
    const result = await flashCard({ id: original.id })

    expect(result).toEqual(null)
  })
})
