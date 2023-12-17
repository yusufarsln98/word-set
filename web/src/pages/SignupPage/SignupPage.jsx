import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { blue, gray } from '@ant-design/colors'
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  GoogleOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Steps,
  Typography,
  message,
  theme,
} from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const { Title, Paragraph } = Typography

const LANGUAGE_OPTIONS = [
  {
    label: 'English',
    url: '/languages/english.png',
    emoji: '🇬🇧',
    greeting: 'Hello!',
  },
  {
    label: 'French',
    url: '/languages/french.png',
    emoji: '🇫🇷',
    greeting: 'Bonjour!',
  },
  {
    label: 'Turkish',
    url: '/languages/turkish.png',
    emoji: '🇹🇷',
    greeting: 'Merhaba!',
  },
  {
    label: 'Spanish',
    url: '/languages/spanish.png',
    emoji: '🇪🇸',
    greeting: '¡Hola!',
  },
  {
    label: 'German',
    url: '/languages/german.png',
    emoji: '🇩🇪',
    greeting: 'Hallo!',
  },
  {
    label: 'Italian',
    url: '/languages/italian.png',
    emoji: '🇮🇹',
    greeting: 'Ciao!',
  },
  {
    label: 'Portuguese',
    url: '/languages/portuguese.png',
    emoji: '🇵🇹',
    greeting: 'Olá!',
  },
  {
    label: 'Japanese',
    url: '/languages/japanese.png',
    emoji: '🇯🇵',
    greeting: 'こんにちは!',
  },
]

const SignupPage = () => {
  const { signUp } = useAuth()
  const emailOrUsernameRef = useRef(null)
  const [nativeLanguage, setNativeLanguage] = useState(null) // Language Option Value
  const [learningLanguage, setLearningLanguage] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const {
    token: { colorLink },
  } = theme.useToken()

  const prev = () => {
    setCurrentStep(currentStep - 1)
  }

  // focus on email when last step is reached
  useEffect(() => {
    if (currentStep === 2) {
      emailOrUsernameRef.current?.focus()
    }
  }, [currentStep])

  const onFinish = async (data) => {
    const response = await signUp({
      username: data.emailOrUsername,
      password: data.password,
      languageNative: nativeLanguage.label,
      languageLearning: learningLanguage.label,
    })

    if (response.message) {
      message(response.message)
    } else if (response.error) {
      message.error(response.error)
    } else {
      // user is signed in automatically
      message.success('Welcome!')
    }
  }

  const steps = [
    {
      title: `Native Language ${nativeLanguage ? nativeLanguage.emoji : ''}`,
      content: (
        <Flex vertical align="center" gap={16}>
          <Title level={3}>Which language is your native language?</Title>
          <SelectLanguage
            selectedLanguage={nativeLanguage}
            setSelectedLanguage={setNativeLanguage}
            languageCannotBeSelected={learningLanguage}
            current={currentStep}
            setCurrent={setCurrentStep}
          />
        </Flex>
      ),
    },
    {
      title: `Learning Language ${
        learningLanguage ? learningLanguage.emoji : ''
      }`,
      content: (
        <Flex vertical align="center" gap={16}>
          <Flex
            align="center"
            justify="space-between"
            style={{ width: '100%' }}
          >
            <Button
              onClick={() => prev()}
              type="text"
              icon={<ArrowLeftOutlined />}
              title='Go back to "Native Language" step'
            />
            <Title level={3}>Which language do you want to learn?</Title>
            <div
              // width of button to center the title
              style={{ width: '64px' }}
            ></div>
          </Flex>
          <SelectLanguage
            selectedLanguage={learningLanguage}
            setSelectedLanguage={setLearningLanguage}
            languageCannotBeSelected={nativeLanguage}
            current={currentStep}
            setCurrent={setCurrentStep}
          />
        </Flex>
      ),
    },
    {
      title: 'Signup to WordSet',
      content: (
        <>
          <Flex justify="center" align="center">
            <Card
              bordered={false}
              // hide shadow
              style={{ boxShadow: 'none' }}
            >
              <Flex
                vertical
                align="center"
                style={{ minWidth: '360px', minHeight: '480px' }}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ width: '100%' }}
                >
                  <Button
                    onClick={() => prev()}
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    title='Go back to "Learning Language" step'
                  />
                  <Title level={3} style={{ margin: '0' }}>
                    {learningLanguage?.greeting} {learningLanguage?.emoji}
                  </Title>
                  <div
                    // width of button to center the title
                    style={{ width: '64px' }}
                  ></div>
                </Flex>
                <Flex
                  vertical
                  align="center"
                  style={{ marginTop: '32px', width: '100%' }}
                >
                  <Paragraph>
                    Already have an account? {/* link with underline */}
                    <Paragraph
                      style={{
                        display: 'inline',
                        textDecoration: 'underline',
                        color: colorLink,
                      }}
                    >
                      <Link color={colorLink} to={routes.login()}>
                        Log in!
                      </Link>
                    </Paragraph>
                  </Paragraph>
                  <Button icon={<GoogleOutlined />} size="large">
                    Signup with your Google account
                  </Button>
                  <Divider style={{ margin: '32px 0' }}>
                    <span style={{ color: gray[5], fontSize: '1rem' }}>or</span>
                  </Divider>
                  <Paragraph style={{ color: gray[5] }}>
                    Signup With You Email
                  </Paragraph>
                  <Form
                    onFinish={onFinish}
                    style={{ width: '100%' }}
                    size="large"
                    layout="vertical"
                  >
                    <Form.Item
                      name="emailOrUsername"
                      rules={[
                        {
                          required: true,
                          message: 'Email is required',
                          type: 'email',
                        },
                      ]}
                    >
                      <Input
                        ref={emailOrUsernameRef}
                        placeholder="Email"
                        prefix={<UserOutlined style={{ color: gray[0] }} />}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Password is required',
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        prefix={<LockOutlined style={{ color: gray[0] }} />}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                      >
                        Signup
                      </Button>
                    </Form.Item>
                  </Form>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </>
      ),
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  return (
    <>
      <MetaTags title="Signup" />
      <Flex
        vertical
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Steps
          current={currentStep}
          items={items}
          style={{ marginTop: 24, width: '100%' }}
        />
        <Flex vertical align="center" style={{ marginTop: 48, width: '100%' }}>
          {steps[currentStep].content}
        </Flex>
      </Flex>
    </>
  )
}

export default SignupPage

const SelectLanguage = ({
  selectedLanguage,
  setSelectedLanguage,
  languageCannotBeSelected,
  current,
  setCurrent,
}) => {
  // box sizing is border-box

  return (
    <Row gutter={[16, 16]}>
      {LANGUAGE_OPTIONS.map((language) => (
        <Col span={6} key={language.label}>
          <Card
            // if cannot be selected, then not hoverable, otherwise hoverable
            hoverable={languageCannotBeSelected?.label !== language.label}
            title={language.label}
            onClick={() => {
              // if it cannot be selected, then do nothing
              if (languageCannotBeSelected?.label === language.label) {
                message.warning(
                  `You can select a language either as your native language or as your learning language, but not both!`
                )
                return
              }
              // select it
              setSelectedLanguage(language)
              // with some delay, go to next step
              setTimeout(() => {
                setCurrent(current + 1)
              }, 300)
            }}
            // if it is selected, then it has a border
            style={{
              border:
                selectedLanguage && selectedLanguage.label === language.label
                  ? `2px solid ${blue[2]}`
                  : // if it cannot be selected, then it has a border
                  languageCannotBeSelected?.label === language.label
                  ? `2px solid ${gray[0]}`
                  : '2px solid transparent',
            }}
          >
            <Flex align="center" justify="center">
              <Image
                src={language.url}
                style={{ maxHeight: '100px', maxWidth: '100px' }}
                preview={false}
              />
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
