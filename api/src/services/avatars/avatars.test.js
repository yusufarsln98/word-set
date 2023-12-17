import {
  avatars,
  avatar,
  createAvatar,
  updateAvatar,
  deleteAvatar,
} from './avatars'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('avatars', () => {
  scenario('returns all avatars', async (scenario) => {
    const result = await avatars()

    expect(result.length).toEqual(Object.keys(scenario.avatar).length)
  })

  scenario('returns a single avatar', async (scenario) => {
    const result = await avatar({ id: scenario.avatar.one.id })

    expect(result).toEqual(scenario.avatar.one)
  })

  scenario('creates a avatar', async () => {
    const result = await createAvatar({
      input: { data: 'String' },
    })

    expect(result.data).toEqual('String')
  })

  scenario('updates a avatar', async (scenario) => {
    const original = await avatar({ id: scenario.avatar.one.id })
    const result = await updateAvatar({
      id: original.id,
      input: { data: 'String2' },
    })

    expect(result.data).toEqual('String2')
  })

  scenario('deletes a avatar', async (scenario) => {
    const original = await deleteAvatar({
      id: scenario.avatar.one.id,
    })
    const result = await avatar({ id: original.id })

    expect(result).toEqual(null)
  })
})
