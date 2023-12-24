import { useEffect, useState } from 'react'

import { gray } from '@ant-design/colors'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'
import { Language } from '@prisma/client'
import {
  AutoComplete,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Space,
  message,
} from 'antd'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { CREATE_SET_MUTATION } from 'src/graphql_queries'

import styles from '../../Global.module.scss'

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
  const [openAddFlashcardModal, setOpenAddFlashcardModal] = useState(false)
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
        termsLanguage: Language[user.userConfig.languageLearning],
        translationsLanguage: Language[user.userConfig.languageNative],
      },
    })
      .then((data) => {
        message.success('Set created!')
        console.log('data', data.data.createSet.id)
        navigate(routes.set({ setId: data.data.createSet.id }))
      })
      .catch((error) => {
        console.error(error)
        message.error('Something went wrong!')
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
        autoComplete="off"
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
                required: true,
                message: 'Please write a title!',
              },
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
              className={styles.bottemBorder}
            />
          </Form.Item>
          <Flex align="center" gap={32}>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please write a description!',
                },
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
                className={styles.bottemBorder}
              />
            </Form.Item>
          </Flex>
        </Flex>
        <Form.Item
          style={{
            marginTop: 28,
          }}
          name="flashcards"
        >
          <Button
            icon={<PlusOutlined />}
            type="dashed"
            size="large"
            onClick={() => setOpenAddFlashcardModal(true)}
          >
            Add Flashcards
          </Button>
          <Modal
            title="Add Flashcard"
            open={openAddFlashcardModal}
            onCancel={() => setOpenAddFlashcardModal(false)}
            footer={null}
          >
            <Flex
              style={{
                height: '500px',
                top: 100,
                overflow: 'hidden',
              }}
            >
              <AutoComplete
                // popupMatchSelectWidth={(calcWidth) => calcWidth}
                style={{
                  marginTop: 28,
                  width: 'calc(100%)',
                }}
                options={options}
                onSelect={(value) => message.success('onSelect')}
              >
                <Input
                  size="large"
                  placeholder="Search a word..."
                  style={{ height: 48, backgroundColor: 'white' }}
                  bordered={false}
                  className={styles.bottemBorder}
                />
              </AutoComplete>
            </Flex>
          </Modal>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateSetPage
