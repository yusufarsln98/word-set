import { useEffect, useRef, useState } from 'react'

import { blue, gray, red } from '@ant-design/colors'
import {
  SearchOutlined,
  PlusCircleFilled,
  ReloadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Layout,
  Tag,
  message,
  theme,
} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { capitalizeFirstLetter } from 'src/utility'

const { Sider, Content } = Layout

const LatestPage = () => {
  const { languageLearning, languageNative } = useAuth().currentUser.userConfig
  const {
    token: { colorBgContainer, colorBgLayout, boxShadowTertiary },
  } = theme.useToken()

  return (
    <>
      <MetaTags title="Latest" description="Latest page" />
      <Layout>
        <Sider
          width={768}
          style={{
            backgroundColor: colorBgLayout,
          }}
        >
          <DictionaryCard
            languageNative={languageNative}
            languageLearning={languageLearning}
          />
        </Sider>
        <Content>
          <Flex
            vertical
            align="center"
            justify="center"
            style={{
              marginTop: 20,
              marginLeft: 20,
              backgroundColor: colorBgContainer,
              borderRadius: 4,
              padding: 20,
              boxShadow: boxShadowTertiary,
            }}
          >
            <Link to={routes.home()}>
              <Flex vertical gap={16}>
                <Card>Excellent Things Will Come Here!</Card>
                <Card>Excellent Things Will Come Here!</Card>
                <Card>Excellent Things Will Come Here!</Card>
                <Card>Excellent Things Will Come Here!</Card>
                <Card>Excellent Things Will Come Here!</Card>
                <Card>Excellent Things Will Come Here!</Card>
              </Flex>
            </Link>
          </Flex>
        </Content>
      </Layout>
    </>
  )
}

export default LatestPage

const getSystemMessage = (searchText, languages) => {
  return `
  You are an advanced ${languages[0]}-${languages[1]} dictionary that takes a searchText (no case sensitive) and returns a JSON object.
  If '${searchText}' is not a ${languages[0]} word, return the object below:
  {
    "word": "${searchText}"
    "error": "No definition found."
  }

  If '${searchText}' is a ${languages[0]} word, fill in the '?' areas in the object and return it:
  Rules: "definition" is the definition of the ${searchText} in ${languages[0]}.
         "example" is a sentence in ${languages[0]} that contains the word.
         "translation" is the translation of the ${searchText} in ${languages[1]} and it can be one or more words.
  {
    "word": "${searchText}",
    "definition": ?,
    "cefrLevel": ?,
    "partOfSpeech": ?,
    "example": ?,
    "translation": ?
  }
  `
}

const getUserMessage = (searchText) => {
  return `searchText: '${searchText}'`
}

const DictionaryCard = function ({ languageNative, languageLearning }) {
  const { boxShadowTertiary } = theme.useToken()
  /*
  Values of the searchResult object:
  0 -> word
  1 -> definition
  2 -> cefrLevel
  3 -> partOfSpeech
  4 -> example
  5 -> translation
  */
  const [searchResult, setSearchResult] = useState({
    word: 'WordSet',
    definition: 'A super cool dictionary, flashcard and learning tool.',
    cefrLevel: 'C2',
    partOfSpeech: 'NOUN',
    example: 'Me and my friends are using WordSet to learn Western Punjabi.',
    translation: 'WordSet',
  })
  const [wordObject, setWordObject] = useState(null)
  const [searchText, setSearchText] = useState('')
  const searchButtonRef = useRef(null) // Trigger search with 'Enter' key
  const inputRef = useRef(null) // Focus on input when page loads
  const [loading, setLoading] = useState(false)

  const getSearchResult = () => {
    setLoading(true)
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REDWOOD_ENV_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        // messages: [{ role: 'user', content: getPrompt(searchText) }],
        // prompt: getPrompt(searchText),
        messages: [
          {
            role: 'system',
            content: getSystemMessage(searchText, [
              languageLearning,
              languageNative,
            ]),
          },
          {
            role: 'user',
            content: getUserMessage(searchText),
          },
        ],
        temperature: 0,
        max_tokens: 240,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', JSON.parse(data.choices[0].message.content))
        setSearchResult(JSON.parse(data.choices[0].message.content))
        setLoading(false)
      })
      .catch((error) => {
        message.error(error.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    // since the searchResult can be any 2 language, we should extract values
    // and set the wordObject as a more representetive object
    if (searchResult) {
      const values = Object.values(searchResult)
      // if searchResult is an error
      if (values.length === 2) {
        const wordObject = {
          word: values[0],
          error: values[1],
        }
        setWordObject(wordObject)
        return
      }
      const wordObject = {
        word: values[0].toLowerCase(),
        definition: values[1].toLowerCase(),
        cefrLevel: values[2].toUpperCase(),
        partOfSpeech: values[3].toUpperCase(),
        example: capitalizeFirstLetter(values[4]),
        translation: values[5].toLowerCase(),
      }
      setWordObject(wordObject)
    }
  }, [searchResult])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
      <Card
        style={{ marginTop: 20, boxShadow: boxShadowTertiary }}
        title={
          <Flex align="center" justify="center" style={{ padding: 12 }}>
            {/* <Image
              src="/logo/Logo-Icon.svg"
              alt="logo"
              height={50}
              preview={false}
            /> */}
            <Title
              level={5}
              style={{ color: blue.primary, marginLeft: 10, marginBottom: 0 }}
            >
              {languageLearning} Dictionary
            </Title>
          </Flex>
        }
        actions={
          searchResult &&
          !searchResult.error && [
            <Button key="reload" type="text" size="large">
              <ReloadOutlined
                onClick={() => {
                  setSearchText('')
                  setWordObject(null)
                }}
              />
            </Button>,
            <Button
              key="reload"
              type="text"
              size="large"
              disabled={
                loading || !wordObject || wordObject?.word === 'wordset'
              }
            >
              <PlusCircleFilled key="plus" />
            </Button>,
          ]
        }
      >
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ width: '100%' }}
        >
          <Form.Item style={{ width: '100%' }}>
            <Input
              placeholder={`Search a ${languageLearning} word...`}
              size="large"
              allowClear
              ref={inputRef}
              suffix={
                <Button
                  ref={searchButtonRef}
                  disabled={
                    searchText.length === 0 ||
                    searchText.toLowerCase() === wordObject?.word.toLowerCase()
                  }
                  loading={loading}
                  icon={<SearchOutlined />}
                  onClick={() => {
                    getSearchResult()
                  }}
                  htmlType="submit"
                />
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={() => searchButtonRef.current.click()}
            />
          </Form.Item>
          {wordObject && (
            <Flex align="flex-start" style={{ width: '100%' }} gap={48}>
              {wordObject.error ? (
                <>
                  <Flex vertical gap={10}>
                    <Title level={3} style={{ color: red[4], marginBottom: 0 }}>
                      {wordObject.word}
                    </Title>
                    <Flex>
                      <Tag color="red">ERROR</Tag>
                    </Flex>
                    <Paragraph style={{ color: gray[0], margin: 0 }}>
                      {wordObject.error}
                    </Paragraph>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex style={{ minWidth: '30%' }} vertical gap={10}>
                    <Title
                      level={3}
                      style={{ color: blue[4], marginBottom: 0 }}
                    >
                      {wordObject.word}
                    </Title>
                    <Flex>
                      <Tag color="geekblue">{languageLearning}</Tag>
                      <Tag color="geekblue">{wordObject.cefrLevel}</Tag>
                      <Tag color="geekblue">{wordObject.partOfSpeech}</Tag>
                      {/* langauge */}
                    </Flex>
                  </Flex>
                  <Flex vertical gap={10}>
                    <Flex vertical>
                      <Paragraph style={{ color: gray[0], margin: 0 }}>
                        DEFINITION
                      </Paragraph>
                      <Paragraph>{wordObject.definition}</Paragraph>
                    </Flex>
                    <Flex vertical>
                      <Paragraph style={{ color: gray[0], margin: 0 }}>
                        EXAMPLE
                      </Paragraph>
                      <Paragraph>&quot;{wordObject.example}&quot;</Paragraph>
                    </Flex>
                    <Flex vertical>
                      <Paragraph style={{ color: gray[0], margin: 0 }}>
                        {languageNative} TRANSLATION
                      </Paragraph>
                      <Paragraph>{wordObject.translation}</Paragraph>
                    </Flex>
                  </Flex>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Card>
    </>
  )
}
