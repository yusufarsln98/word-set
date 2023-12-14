import { useRef, useState } from 'react'

import { blue, gray } from '@ant-design/colors'
import { ArrowUpOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input, Space } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const getPrompt = (searchText) => {
  return `Act as an advanced dictionary. Do not make any explanation. Just write the object that is asked for. Fill in the '?' areas in the object. If the given word is not a valid word, write 'null' without quotes. {"word": "${searchText}", "definitionInEnglish": ?, "exampleInEnglish": ?, "turkishTranslation": ?}`
}

// const requestData = {
//   model: 'gpt-3.5-turbo',
//   messages: [{ role: 'user', content: 'Say this is a test!' }],
//   temperature: 0.2,
// }

// result:

// definitionInEnglish: 'a hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub'
// exampleInEnglish: 'I need a cup of coffee to wake me up in the morning.'
// turkishTranslation: 'kahve'
// word: 'coffee'

const LatestPage = () => {
  const [dictionaryresult, setDictionaryResult] = useState(null)
  const [searchText, setSearchText] = useState('')
  const searchButtonRef = useRef(null) // Trigger search with 'Enter' key
  const [loading, setLoading] = useState(false)

  const getDictionaryResult = () => {
    setLoading(true)
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REDWOOD_ENV_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        // messages: [{ role: 'user', content: getPrompt(searchText) }],
        prompt: getPrompt(searchText),
        max_tokens: 128,
        temperature: 0.2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setDictionaryResult(data.choices[0].text) string to object
        console.log(data.choices[0].text)
        setDictionaryResult(JSON.parse(data.choices[0].text))
        setLoading(false)
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error)
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
        getDictionaryResult()
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
            {dictionaryresult && (
              <>
                <div
                  style={{ color: blue.primary, fontSize: 20, fontWeight: 600 }}
                >
                  {dictionaryresult.word}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {dictionaryresult.definitionInEnglish}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {dictionaryresult.exampleInEnglish}
                </div>
                <div
                  style={{ color: gray.primary, fontSize: 16, fontWeight: 400 }}
                >
                  {dictionaryresult.turkishTranslation}
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
