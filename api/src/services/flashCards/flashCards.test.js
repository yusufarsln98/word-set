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
        wordId: scenario.flashCard.two.wordId,
        setId: scenario.flashCard.two.setId,
      },
    })

    expect(result.wordId).toEqual(scenario.flashCard.two.wordId)
    expect(result.setId).toEqual(scenario.flashCard.two.setId)
  })

  scenario('updates a flashCard', async (scenario) => {
    const original = await flashCard({
      id: scenario.flashCard.one.id,
    })
    const result = await updateFlashCard({
      id: original.id,
      input: { wordId: scenario.flashCard.two.wordId },
    })

    expect(result.wordId).toEqual(scenario.flashCard.two.wordId)
  })

  scenario('deletes a flashCard', async (scenario) => {
    const original = await deleteFlashCard({
      id: scenario.flashCard.one.id,
    })
    const result = await flashCard({ id: original.id })

    expect(result).toEqual(null)
  })
})
