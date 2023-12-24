import { users, user, createUser, updateUser, deleteUser } from './users'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async (scenario) => {
    const result = await createUser({
      input: {
        name: 'String',
        username: 'String1231191',
        email: 'String497900',
        hashedPassword: 'String',
        salt: 'String',
        daysStudied: '2023-12-23T13:54:06.099Z',
        dictionaryId: scenario.user.two.dictionaryId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.username).toEqual('String1231191')
    expect(result.email).toEqual('String497900')
    expect(result.hashedPassword).toEqual('String')
    expect(result.salt).toEqual('String')
    expect(result.daysStudied).toEqual(new Date('2023-12-23T13:54:06.099Z'))
    expect(result.dictionaryId).toEqual(scenario.user.two.dictionaryId)
  })

  scenario('updates a user', async (scenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a user', async (scenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
