// DB'ye bakilacak, kelime varsa, kelimeyi getir, yoksa, kelimeyi olustur.

import { useEffect, useRef, useState } from 'react'

import { blue, gray, red } from '@ant-design/colors'
import {
  SearchOutlined,
  PlusCircleFilled,
  ReloadOutlined,
  SoundFilled,
} from '@ant-design/icons'
import {
  Button,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Tag,
  message,
  theme,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'

// import { Link, routes } from '@redwoodjs/router'

import { useQuery, useMutation } from '@redwoodjs/web'

import { capitalizeAll, capitalizeFirstLetter } from 'src/utility'

// const modes = ['word', 'proverb', 'idiom', 'phrase']
const modes = [
  {
    label: 'Word',
    value: 'word',
  },
  {
    label: 'Proverb',
    value: 'proverb',
  },
  {
    label: 'Idiom',
    value: 'idiom',
  },
  {
    label: 'Phrase',
    value: 'phrase',
  },
]

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
  const [mode, setMode] = useState(modes[0].value)
  const searchButtonRef = useRef(null) // Trigger search with 'Enter' key
  const inputRef = useRef(null) // Focus on input when page loads
  const [loading, setLoading] = useState(false)

  const searchWithGPT = getSearchResultWithGPT(
    setLoading,
    searchText,
    mode,
    languageLearning,
    languageNative,
    setSearchResult
  )

  const onClickSearch = async () => {
    searchWithGPT()
  }

  useEffect(() => {
    // since the searchResult can be any 2 language, we should extract values
    // and set the wordObject as a more representetive object
    if (searchResult) {
      console.log('searchResult', searchResult)
      const values = Object.values(searchResult) // get values of the object, since the key can be changed
      if (searchResult.error) {
        const wordObject = {
          word: values[0].toLowerCase(),
          error: searchResult.error.toLowerCase(),
        }
        setWordObject(wordObject)
        return
      }
      const wordObject = {
        word: values[0].toLowerCase(),
        definition: searchResult.definition.toLowerCase(),
        cefrLevel: searchResult.cefrLevel.toUpperCase(),
        partOfSpeech: searchResult.partOfSpeech.toUpperCase(),
        example: capitalizeFirstLetter(searchResult.example),
        translation: searchResult.translation.toLowerCase(),
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
        <Form>
          <Space.Compact style={{ marginTop: 20 }}>
            <Form.Item style={{ width: 576 }} name="searchText">
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
                      searchText.toLowerCase() ===
                        wordObject?.word.toLowerCase() ||
                      searchText.toLowerCase().trim() ===
                        wordObject?.word.toLowerCase()
                    }
                    loading={loading}
                    icon={<SearchOutlined style={{ fontSize: 16 }} />}
                    onClick={() => {
                      onClickSearch()
                    }}
                    type="text"
                    htmlType="submit"
                    size="small"
                  />
                }
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={() => searchButtonRef.current.click()}
              />
            </Form.Item>
            <Form.Item name="mode" style={{ width: 160 }}>
              <Select
                defaultValue="word"
                size="large"
                onChange={(value) => {
                  setMode(value)
                }}
                options={modes}
              ></Select>
            </Form.Item>
          </Space.Compact>
        </Form>
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

const getSystemMessage = (mode, [languageLearning, languageNative]) => {
  return `
  You function as a dictionary, provided a/an ${mode} and returning either a 'definition object' or an 'error object'.

  Your task is to determine whether the provided ${mode} is belong to the ${languageLearning} or not.

  If you determine the provided ${mode} belong to the ${languageLearning}, return the 'definition object', otherwise, return the 'error object'.
  Both objects are described below.

  definition object
  {
    "${mode}": ?, [${capitalizeAll(mode)} IN ${languageLearning}]
    "definition": ?, [DEFINITION IN ${languageLearning}]
    "cefrLevel": ?,
    "partOfSpeech": ?,
    "example": ?, [EXAMPLE IN ${languageLearning}]
    "translation": ? [TRANSLATION IN ${languageNative} IN ONE OR A FEW WORDS]
  }

  error object
  {
    "${mode}": ?, ${mode} that you are searching for
    "error": "No definition found."
  }`
}

const getUserMessage = (mode, searchText) => {
  return `${mode}: ${searchText}`
}

const getSearchResultWithGPT = (
  setLoading,
  searchText,
  mode, // word, proverb, idiom, phrase
  languageLearning,
  languageNative,
  setSearchResult
) => {
  return () => {
    setLoading(true)
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REDWOOD_ENV_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: getSystemMessage(mode, [languageLearning, languageNative]),
          },
          {
            role: 'user',
            content: getUserMessage(mode, searchText),
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
}
