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
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'

// import { Link, routes } from '@redwoodjs/router'

import { useQuery, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { CREATE_WORD_MUTATION, QUERY_WORD_BY_SEARCH } from 'src/graphql_queries'
import { capitalizeAll, capitalizeFirstLetter } from 'src/utility'

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

  const { currentUser } = useAuth()

  const [wordObject, setWordObject] = useState({
    word: 'wordset',
    definition:
      'A super cool dictionary, flashcard and a new fashion language learning tool.',
    cefrLevel: 'C2',
    partOfSpeech: 'NOUN',
    example: 'Me and my friends are using WordSet to learn Western Punjabi.',
    translation: 'wordset',
  })
  const [searchResult, setSearchResult] = useState() // state for gpt search result
  const [searchText, setSearchText] = useState('')
  const [queryText, setQueryText] = useState('') // state for triggering query
  const [mode, setMode] = useState(modes[0].value)
  const searchButtonRef = useRef(null) // Trigger search with 'Enter' key
  const [gptSearchLoading, setGptSearchLoading] = useState(false)
  const [createWord] = useMutation(CREATE_WORD_MUTATION, {
    onCompleted: (data) => {
      console.log('data', data)
    },
    onError: (error) => {
      console.error('error', error)
    },
  })
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(QUERY_WORD_BY_SEARCH, {
    variables: {
      search: `${queryText}-${currentUser.dictionary.name}`,
    },
  })

  const searchWithGPT = getSearchResultWithGPT(
    setGptSearchLoading,
    searchText,
    mode,
    languageLearning,
    languageNative,
    setSearchResult
  )

  // to trigger DB query
  const onClickSearch = () => {
    setQueryText(searchText.trim())
  }

  // After triggering DB query,
  // first check if the word is in the DB, if not, search with GPT
  useEffect(() => {
    if (queryText && queryText.length > 0 && queryText !== wordObject?.word) {
      if (queryData && queryData.wordBySearch) {
        const wordObject = {
          word: queryData.wordBySearch.term,
          definition: queryData.wordBySearch.meanings[0].definition,
          cefrLevel: queryData.wordBySearch.meanings[0].cefrLevel,
          partOfSpeech: queryData.wordBySearch.meanings[0].partOfSpeech,
          example: queryData.wordBySearch.meanings[0].example,
          translation: queryData.wordBySearch.meanings[0].translation,
        }
        setWordObject(wordObject)
      } else if (queryData && queryData.wordBySearch === null) {
        searchWithGPT()
      }
    }
  }, [queryData, queryText])

  // After GPT search, if the word is not in the DB, create it
  useEffect(() => {
    if (searchResult) {
      // since the searchResult can be any 2 language, we should extract values
      // and set the wordObject as a more representetive object
      if (searchResult.error) {
        setWordObject(searchResult)
        return
      }
      setWordObject({
        ...searchResult,
        partOfSpeech: searchResult.partOfSpeech,
      })
      createWord({
        variables: {
          term: searchResult.word,
          dictionaryId: currentUser.dictionaryId,
          definition: searchResult.definition,
          example: searchResult.example,
          cefrLevel: searchResult.cefrLevel,
          partOfSpeech: searchResult.partOfSpeech,
          translation: searchResult.translation,
        },
      })
    }
  }, [searchResult])

  return (
    <>
      <Flex align="center" justify="start">
        <Form autoComplete="off">
          <Space.Compact style={{ marginTop: 20 }}>
            <Form.Item style={{ width: 576 }} name="searchText">
              <Input
                placeholder={`Search a ${languageLearning} word...`}
                size="large"
                allowClear
                suffix={
                  <Button
                    ref={searchButtonRef}
                    disabled={
                      searchText.length === 0 ||
                      searchText.toLowerCase() ===
                        wordObject?.word.toLowerCase() ||
                      searchText.toLowerCase().trim() ===
                        wordObject?.word.toLowerCase() ||
                      gptSearchLoading ||
                      queryLoading
                    }
                    loading={gptSearchLoading || queryLoading}
                    icon={<SearchOutlined style={{ fontSize: 16 }} />}
                    onClick={() => {
                      onClickSearch()
                    }}
                    type="text"
                    htmlType="submit"
                    size="small"
                  />
                }
                onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                onPressEnter={() => searchButtonRef.current.click()}
                value={searchText}
              />
            </Form.Item>
            <Form.Item
              name="mode"
              style={{ width: 160 }}
              initialValue={modes[0].value}
            >
              <Select
                size="large"
                onChange={(value) => {
                  setMode(value)
                }}
                options={modes}
              />
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
                  <Title level={3} style={{ color: blue[4], marginBottom: 0 }}>
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
                  <Tag color="geekblue">
                    {wordObject.partOfSpeech.toUpperCase()}
                  </Tag>
                  {/* langauge */}
                </Flex>
              </Flex>
              <Flex vertical gap={10} style={{ width: '100%', height: '100%' }}>
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
                    gptSearchLoading ||
                    !wordObject ||
                    wordObject?.word === 'wordset'
                  }
                  title="Add to a sets"
                  icon={<PlusCircleFilled />}
                />
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Dictionary

const getSystemMessage = (mode, [languageLearning, languageNative]) => {
  return `
  You function as a ${languageLearning} dictionary, provided a ${mode} and returning either a 'definition object' or an 'error object'.
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
        const res = JSON.parse(data.choices[0].message.content)
        // refactor the response to standardize the response
        if (res.error) {
          const searchResult = {
            word: res.word.toLowerCase(),
            error: res.error,
          }
          setSearchResult(searchResult)
          setLoading(false)
          return
        } else {
          const values = Object.values(res)
          const searchResult = {
            word: values[0].toLowerCase(),
            definition: values[1].toLowerCase(),
            cefrLevel: values[2].toUpperCase(),
            partOfSpeech: values[3].toLowerCase(),
            example: values[4].toLowerCase(),
            translation: values[5].toLowerCase(),
          }
          setSearchResult(searchResult)
          setLoading(false)
          return
        }
      })
      .catch((error) => {
        message.error(error.message)
        setLoading(false)
      })
  }
}
