import { useEffect, useRef, useState } from 'react'

import { blue, gray, red } from '@ant-design/colors'
import {
  SearchOutlined,
  PlusCircleFilled,
  ReloadOutlined,
  SoundFilled,
} from '@ant-design/icons'
import { Button, Flex, Form, Input, Tag, message, theme } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'

// import { Link, routes } from '@redwoodjs/router'

import { capitalizeFirstLetter } from 'src/utility'

/*
  Values of the searchResult object:
  0 -> word
  1 -> definition
  2 -> cefrLevel
  3 -> partOfSpeech
  4 -> example
  5 -> translation
  */
const Dictionary = function ({ languageNative, languageLearning }) {
  const {
    token: { colorBgLayout, boxShadowTertiary, borderRadius },
  } = theme.useToken()

  const [searchResult, setSearchResult] = useState({
    word: 'WordSet',
    definition:
      'A super cool dictionary, flashcard and a new fashion language learning tool.',
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
      <Flex align="center" justify="start">
        <Form.Item style={{ marginTop: 20, width: 576 }}>
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
      </Flex>
      <Flex
        style={{
          boxShadow: boxShadowTertiary,
          width: 992,
          borderRadius: borderRadius,
        }}
      >
        {wordObject && (
          <Flex
            align="flex-start"
            style={{
              width: '100%',
              background: 'white',
              padding: 24,
              borderRadius: 4,
            }}
            gap={48}
          >
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
                <Flex
                  style={{ minWidth: '24%', height: '100%' }}
                  vertical
                  gap={10}
                >
                  <Flex align="center" justify="space-between">
                    <Title
                      level={3}
                      style={{ color: blue[4], marginBottom: 0 }}
                    >
                      {wordObject.word}
                    </Title>
                    <Button
                      key="reload"
                      type="text"
                      size="large"
                      title="Pronounce"
                      onClick={() => {
                        new Audio('/quack.mp3').play()
                      }}
                      // disabled={true}
                      icon={<SoundFilled />}
                    />
                  </Flex>
                  <Flex align="center">
                    <Tag color="geekblue">{languageLearning}</Tag>
                    <Tag color="geekblue">{wordObject.cefrLevel}</Tag>
                    <Tag color="geekblue">{wordObject.partOfSpeech}</Tag>
                    {/* langauge */}
                  </Flex>
                </Flex>
                <Flex
                  vertical
                  gap={10}
                  style={{ width: '100%', height: '100%' }}
                >
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
                      {languageNative.toUpperCase()} TRANSLATION
                    </Paragraph>
                    <Paragraph>{wordObject.translation}</Paragraph>
                  </Flex>
                </Flex>
                <Flex
                  vertical
                  align="center"
                  justify="space-between"
                  style={{
                    // left border
                    // borderLeft: `1px solid ${gray[2]}`, // set a soft gray border
                    borderLeft: `1px solid ${colorBgLayout}`, // set a soft gray border
                    alignSelf: 'stretch',
                    paddingLeft: 12,
                  }}
                >
                  <Button
                    type="text"
                    size="large"
                    title="Clear search"
                    disabled={true}
                    icon={<ReloadOutlined />}
                  />
                  <Button
                    type="text"
                    size="large"
                    disabled={
                      loading || !wordObject || wordObject?.word === 'wordset'
                    }
                    title="Add to a sets"
                    icon={<PlusCircleFilled />}
                  />
                </Flex>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default Dictionary

const getSystemMessage = (searchText, languages) => {
  return `
  You are an advanced ${languages[0]}-${languages[1]} dictionary that takes a searchText (no case sensitive!) and returns a JSON object.
  If '${searchText}' is not a ${languages[0]} word, return the object below:
  {
    "word": "${searchText}"
    "error": "No definition found."
  }
  If '${searchText}' is a ${languages[0]} word, fill in the '?' areas in the object and return it:
  {
    "word": "${searchText}",
    "definition": ?, (note: "definition" is the definition of the ${searchText} in ${languages[0]}.)
    "cefrLevel": ?,
    "partOfSpeech": ?,
    "example": ?, (note: "example" is a sentence in ${languages[0]} that contains the word.)
    "translation": ? (note: "translation" is the translation of the ${searchText} in ${languages[1]} and it can be one or more words.)
  }
  `
}

const getUserMessage = (searchText) => {
  return `searchText: '${searchText}'`
}
