import { cards, card, createCard, updateCard, deleteCard } from './cards'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cards', () => {
  scenario('returns all cards', async (scenario) => {
    const result = await cards()

    expect(result.length).toEqual(Object.keys(scenario.card).length)
  })

  scenario('returns a single card', async (scenario) => {
    const result = await card({ id: scenario.card.one.id })

    expect(result).toEqual(scenario.card.one)
  })

  scenario('creates a card', async (scenario) => {
    const result = await createCard({
      input: {
        translation: 'String',
        definition: 'String',
        example: 'String',
        cefrLevel: 'String',
        partOfSpeech: 'String',
        wordId: scenario.card.two.wordId,
      },
    })

    expect(result.translation).toEqual('String')
    expect(result.definition).toEqual('String')
    expect(result.example).toEqual('String')
    expect(result.cefrLevel).toEqual('String')
    expect(result.partOfSpeech).toEqual('String')
    expect(result.wordId).toEqual(scenario.card.two.wordId)
  })

  scenario('updates a card', async (scenario) => {
    const original = await card({ id: scenario.card.one.id })
    const result = await updateCard({
      id: original.id,
      input: { translation: 'String2' },
    })

    expect(result.translation).toEqual('String2')
  })

  scenario('deletes a card', async (scenario) => {
    const original = await deleteCard({ id: scenario.card.one.id })
    const result = await card({ id: original.id })

    expect(result).toEqual(null)
  })
})
