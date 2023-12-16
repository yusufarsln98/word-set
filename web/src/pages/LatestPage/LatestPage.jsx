import { useRef, useState } from 'react'

import { blue, gray } from '@ant-design/colors'
import { ArrowUpOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input, Space } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const getSystemMessage = (searchText, languages) => {
  return `You are an advanced ${languages[0]}-${
    languages[1]
  } dictionary that takes a searchText (no case sensitive) and returns a JSON object.
  If '${searchText}' is not an ${
    languages[0]
  } word, return the object below: (IMPORTANT)
  {
    "word": "${searchText}"
    "error": "No definition found."
  }
  If '${searchText}' is an ${
    languages[0]
  } word, fill in the '?' areas in the object and return it: (IMPORTANT)
  {
    "word": "${searchText}",
    "definitionIn${languages[0]}": ?,
    "cefrLevel": ?,
    "partOfSpeech": ?,
    "exampleIn${languages[0]}": ?,
    "${languages[1].toLowerCase()}Translation": ?
  }`
}

const getUserMessage = (searchText) => {
  return `searchText: '${searchText}'`
}

const LatestPage = () => {
  const [searchResult, setSearchResult] = useState(null)
  const [searchText, setSearchText] = useState('')
  const searchButtonRef = useRef(null) // Trigger search with 'Enter' key
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
            content: getSystemMessage(searchText, ['English', 'Turkish']),
          },
          {
            role: 'user',
            content: getUserMessage(searchText),
          },
        ],
        temperature: 0,
        max_tokens: 200,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setSearchResult(data.choices[0].text) string to object
        console.log('data', data.choices[0].message.content)
        setSearchResult(JSON.parse(data.choices[0].message.content))
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  const suffix = (
    <Button
      ref={searchButtonRef}
      disabled={!searchText}
      loading={loading}
      icon={<ArrowUpOutlined />}
      onClick={() => {
        getSearchResult()
        setSearchText('')
      }}
      htmlType="submit"
    />
  )

  return (
    <>
      <MetaTags title="Latest" description="Latest page" />

      <Card
        style={{
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            width: '100%',
            height: '200px',
          }}
        >
          <Form>
            <Form.Item>
              <Input
                placeholder="Search a Word"
                style={{
                  width: 500,
                }}
                size="large"
                suffix={suffix}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={() => searchButtonRef.current.click()}
              />
            </Form.Item>
          </Form>
        </Flex>
      </Card>

      <Card
        style={{
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            width: '100%',
            height: '200px',
          }}
        >
          <Space direction="vertical">
            {searchResult && (
              <>
                <div
                  style={{ color: blue.primary, fontSize: 20, fontWeight: 600 }}
                >
                  {searchResult.word}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {searchResult.definitionInEnglish}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {searchResult.cefrLevel}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {searchResult.partOfSpeech}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {searchResult.exampleInEnglish}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {searchResult.turkishTranslation}
                </div>
              </>
            )}
          </Space>
        </Flex>
      </Card>
    </>
  )
}

export default LatestPage
