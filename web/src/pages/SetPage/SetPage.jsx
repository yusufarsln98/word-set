import { useState } from 'react'

import { blue, gray } from '@ant-design/colors'
import {
  BlockOutlined,
  MoreOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Flex, Skeleton, message } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import ReactCardFlip from 'react-card-flip'

import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { SET_QUERY, DELETE_SET_MUTATION } from 'src/graphql_queries'

// import Global.module.scss
import styles from '../../Global.module.scss'

const SetPage = ({ setId }) => {
  const { data, loading } = useQuery(SET_QUERY, {
    variables: { id: setId },
  })

  const set = data?.set
  console.log('set', set)
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

  return (
    <>
      <MetaTags title="Set" description="Set page" />
      <SetPageHeader set={set} />
      {loading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
          <Flashcard
            flashcard={set?.flashCards[currentFlashcardIndex]}
            termsLanguage={set?.termsLanguage}
            translationsLanguage={set?.translationsLanguage}
          />
          <Flex align="center" justify="center">
            <Flex align="center" style={{ marginTop: 24 }} gap={24}>
              <Button
                type="text"
                icon={<LeftOutlined />}
                disabled={currentFlashcardIndex === 0}
                onClick={() => {
                  setCurrentFlashcardIndex(currentFlashcardIndex - 1)
                }}
              />
              {/* print index and flashcard size */}
              <Title level={4}>
                {currentFlashcardIndex + 1}/{set?.flashCards.length}
              </Title>
              <Button
                type="text"
                icon={<RightOutlined />}
                disabled={currentFlashcardIndex === set?.flashCards.length - 1}
                onClick={() => {
                  setCurrentFlashcardIndex(currentFlashcardIndex + 1)
                }}
              />
            </Flex>
          </Flex>
        </>
      )}
    </>
  )
}

export default SetPage

const SetPageHeader = ({ set }) => {
  const { currentUser } = useAuth()
  const [deleteSet] = useMutation(DELETE_SET_MUTATION, {
    variables: { id: set?.id },
    onCompleted: () => {
      message.success('Set deleted')
      navigate(routes.sets({ userId: currentUser.id }))
    },
  })
  return (
    <>
      <Flex vertical gap={24}>
        <Flex vertical>
          <Flex align="center" justify="space-between" gap={16}>
            <h1 style={{ color: gray[6] }}>{set?.title}</h1>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'delete',
                    label: 'Delete',
                    danger: true,
                    onClick: () => {
                      deleteSet()
                    },
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button type="text" size="small" style={{ color: gray[6] }}>
                <MoreOutlined rotate={90} />
              </Button>
            </Dropdown>
          </Flex>
        </Flex>
        <Paragraph style={{ color: gray[6] }}>{set?.description}</Paragraph>
        <Flex align="center" justify="start" gap={16}>
          <Button
            size="large"
            style={{ width: '100%' }}
            className={styles.hoverable}
          >
            <Flex
              align="center"
              gap={8}
              style={{
                fontSize: '1.2rem',
              }}
            >
              <BlockOutlined style={{ color: blue[5] }} />
              Flashcards
            </Flex>
          </Button>
          <Button disabled size="large" style={{ width: '100%' }}>
            Learn
          </Button>
          <Button disabled size="large" style={{ width: '100%' }}>
            Test
          </Button>
          <Button disabled size="large" style={{ width: '100%' }}>
            Match
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

const Flashcard = ({ flashcard, termsLanguage, translationsLanguage }) => {
  console.log('flashcard', flashcard.word.meanings[0])
  const [isFlipped, setIsFlipped] = useState(false)
  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <FlashcardFront
          flashcard={flashcard}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        >
          {flashcard?.word.term}
        </FlashcardFront>
        <FlashcardBack
          flashcard={flashcard}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        >
          <div>
            {' '}
            [{termsLanguage}] {flashcard?.word.meanings[0].definition}
          </div>
          <div>{flashcard?.word.meanings[0].example}</div>
          <div>
            {' '}
            [{translationsLanguage}] {flashcard?.word.meanings[0].translation}
          </div>
        </FlashcardBack>
      </ReactCardFlip>
    </>
  )
}

const FlashcardBack = ({ children, isFlipped, setIsFlipped }) => {
  return (
    <>
      <Flex
        onClick={() => {
          setIsFlipped(!isFlipped)
        }}
      >
        <CardWrapper>{children}</CardWrapper>
      </Flex>
    </>
  )
}

const FlashcardFront = ({ children, isFlipped, setIsFlipped }) => {
  return (
    <>
      <Flex
        onClick={() => {
          setIsFlipped(!isFlipped)
        }}
      >
        <CardWrapper>{children}</CardWrapper>
      </Flex>
    </>
  )
}

const CardWrapper = ({ children }) => {
  return (
    <>
      <Card
        style={{
          background: 'white',
          marginTop: 24,
          width: '100%',
        }}
      >
        <Flex
          align="center"
          justify="space-evenly"
          vertical
          style={{
            height: '480px',
            width: '100%',
            overflow: 'auto',
            fontSize: '1.6rem',
          }}
        >
          {children}
        </Flex>
      </Card>
    </>
  )
}
