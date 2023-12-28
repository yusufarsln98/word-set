import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Flex, Modal, Space, theme } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const USER_QUERY_SETS_WITHOUT_WORD = gql`
  query UserSetsWithoutWord($input: UserSetsWithoutWordInput!) {
    userSetsWithoutWord(input: $input) {
      id
      title
      flashCards {
        wordId
      }
    }
  }
`

export const CREATE_FLASHCARD_MUTATION = gql`
  mutation CreateFlashCardMutation($input: CreateFlashCardInput!) {
    createFlashCard(input: $input) {
      id
    }
  }
`

// if any set has a flashcard with same word and meaning index
// user cannot add that word to the relevent set
const AddFlashcardToSetModal = ({
  addWordModalVisible,
  setAddWordModalVisible,
  word,
}) => {
  const { currentUser } = useAuth()

  const { data, error, loading } = useQuery(USER_QUERY_SETS_WITHOUT_WORD, {
    variables: {
      input: {
        userId: currentUser?.id,
        wordId: word?.wordId,
      },
    },
  })

  console.log('data', data)
  console.log('word', word)

  return (
    <Modal
      open={addWordModalVisible}
      footer={null}
      onCancel={() => {
        setAddWordModalVisible(false)
      }}
    >
      <Flex
        vertical
        style={{
          maxHeight: '480px',
          overflowY: 'auto',
        }}
      >
        <Title level={3}>Add &apos;{word.word}&apos; to a set</Title>
        <Paragraph>Select a set to add &apos;{word.word}&apos; to</Paragraph>
        {loading && <p>Loading...</p>}
        {error && <p>There was an error</p>}
        {data && (
          <SetList
            sets={data.userSetsWithoutWord}
            setAddWordModalVisible={setAddWordModalVisible}
            word={word}
          />
        )}
      </Flex>
    </Modal>
  )
}

const SetList = ({ sets, setAddWordModalVisible, word }) => {
  const {
    token: { colorBgLayout, borderRadiusLG },
  } = theme.useToken()
  // takes wordId, meaningIndex, setId
  const [createFlashCard] = useMutation(CREATE_FLASHCARD_MUTATION, {
    onCompleted: () => {
      setAddWordModalVisible(false)
    },
    refetchQueries: ['UserQuery'], // refresh the user query from homepage
  })
  console.log('sets', sets)
  return (
    <Space direction="vertical">
      {sets.length === 0 && (
        <Empty description="Either you don't have any set or you already have this word in your all sets." />
      )}
      {sets.map((set) => {
        return (
          <Flex
            key={set.id}
            align="center"
            justify="space-between"
            style={{
              background: colorBgLayout,
              borderRadius: borderRadiusLG,
              padding: '1rem',
            }}
          >
            {set.title}
            <Button
              type="text"
              onClick={() => {
                createFlashCard({
                  variables: {
                    input: {
                      wordId: word?.wordId,
                      meaningIndex: 0,
                      setId: set.id,
                    },
                  },
                })
              }}
              disabled={set?.flashCards?.some(
                (flashCard) => flashCard.wordId === word.wordId
              )}
            >
              <PlusOutlined />
            </Button>
          </Flex>
        )
      })}
    </Space>
  )
}

export default AddFlashcardToSetModal
