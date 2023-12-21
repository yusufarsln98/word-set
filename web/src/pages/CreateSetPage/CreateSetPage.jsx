import { useEffect, useState } from 'react'

import { gray } from '@ant-design/colors'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Flex, Form, Input, Space, message } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { CREATE_SET_MUTATION } from 'src/graphql'

const renderTitle = (title) => <span>{title}</span>
const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
})
const options = [
  {
    label: renderTitle('Flash Cards'),
    options: [renderItem('Dummy Value 1', 1), renderItem('Dummy Value 2', 2)],
  },
  {
    label: renderTitle('Dictoinary'),
    options: [renderItem('Dummy Value 3', 3)],
  },
]

const CreateSetPage = () => {
  const [form] = Form.useForm()
  const [flashcards, setFlashcards] = useState([])
  const user = useAuth().currentUser
  const { userConfig } = user
  const [createSet, { loading, error }] = useMutation(CREATE_SET_MUTATION, {
    onCompleted: (data) => {
      console.log(data)
    },
  })

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    createSet({
      variables: {
        title: values.title,
        description: values.description,
        userId: user.id,
        termsLanguage: userConfig.languageNative,
        translationsLanguage: userConfig.languageLearning,
        flashCards: flashcards,
      },
    }).finally(() => {
      message.success('Set created!')
      form.resetFields()
    })
  }

  return (
    <>
      <MetaTags title="Create Set" description="CreateSet page" />
      <Form
        name="create-set"
        onFinish={onFinish}
        style={{ width: '100%' }}
        layout="vertical"
        form={form}
      >
        <Flex align="center" justify="space-between">
          <h1 style={{ color: gray[6] }}>Create new word set</h1>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              size="large"
              // disabled when loading or title and description are empty
              disabled={loading}
            >
              Create
            </Button>
          </Form.Item>
        </Flex>
        <Flex vertical style={{ marginTop: 28 }}>
          <Form.Item
            name="title"
            rules={[
              {
                max: 50,
                message: 'Name should be less than 100 characters!',
              },
              {
                min: 5,
                message: 'Name should be more than 5 characters!',
              },
            ]}
          >
            <Input
              style={{ width: '100%', height: 48, backgroundColor: 'white' }}
              placeholder="Enter a title, like 'The Vocabulary of the The Grapes of Wrath'"
              size="large"
              bordered={false}
            />
          </Form.Item>
          <Flex align="center" gap={32}>
            <Form.Item
              name="description"
              rules={[
                {
                  max: 100,
                  message: 'Description should be less than 100 characters!',
                },
                {
                  min: 10,
                  message: 'Description should be more than 10 characters!',
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input.TextArea
                style={{ width: '100%', backgroundColor: 'white' }}
                placeholder="Add a description..."
                size="large"
                // disable resizing of textarea
                autoSize={{ minRows: 4, maxRows: 4 }}
                bordered={false}
              />
            </Form.Item>
            <Form.Item>
              <Flex vertical style={{ width: '100%' }} gap={24}>
                <Input
                  title="Native language"
                  size="large"
                  style={{ height: 44, width: 320, backgroundColor: 'white' }}
                  contentEditable={false}
                  value={userConfig?.languageNative}
                  bordered={false}
                />
                <Input
                  title="Learning language"
                  size="large"
                  style={{ height: 44, width: 320, backgroundColor: 'white' }}
                  contentEditable={false}
                  value={userConfig?.languageLearning}
                  bordered={false}
                />
              </Flex>
            </Form.Item>
          </Flex>
        </Flex>
        <Flex vertical>
          <h2 style={{ color: gray[6] }}>Add flashcards</h2>
        </Flex>
        <Form.Item>
          <AutoComplete
            // popupMatchSelectWidth={(calcWidth) => calcWidth}
            style={{
              marginTop: 28,
              width: 'calc(100% - 352px)',
            }}
            options={options}
            onSelect={(value) => message.success('onSelect')}
          >
            <Input
              size="large"
              placeholder="Search a word"
              style={{ height: 48, backgroundColor: 'white' }}
              bordered={false}
            />
          </AutoComplete>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateSetPage
