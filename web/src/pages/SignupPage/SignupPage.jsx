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

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import LoginAndSignupPageLayout from 'src/layouts/LoginAndSignupPageLayout/LoginAndSignupPageLayout'

const { Title, Paragraph } = Typography

const LANGUAGE_OPTIONS = [
  {
    label: 'English',
    value: 'en',
    url: '/languages/english.png',
    emoji: '🇬🇧',
    greeting: 'Hello!',
  },
  {
    label: 'French',
    value: 'fr',
    url: '/languages/french.png',
    emoji: '🇫🇷',
    greeting: 'Bonjour!',
  },
  {
    label: 'Turkish',
    value: 'tr',
    url: '/languages/turkish.png',
    emoji: '🇹🇷',
    greeting: 'Merhaba!',
  },
  {
    label: 'Spanish',
    value: 'es',
    url: '/languages/spanish.png',
    emoji: '🇪🇸',
    greeting: '¡Hola!',
  },
  {
    label: 'German',
    value: 'de',
    url: '/languages/german.png',
    emoji: '🇩🇪',
    greeting: 'Hallo!',
  },
  {
    label: 'Italian',
    value: 'it',
    url: '/languages/italian.png',
    emoji: '🇮🇹',
    greeting: 'Ciao!',
  },
  {
    label: 'Portuguese',
    value: 'pt',
    url: '/languages/portuguese.png',
    emoji: '🇵🇹',
    greeting: 'Olá!',
  },
  {
    label: 'Japanese',
    value: 'ja',
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
            style={{
              width: '100%',
            }}
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
              style={{
                width: '64px',
              }}
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
              style={{
                boxShadow: 'none',
              }}
            >
              <Flex
                vertical
                align="center"
                style={{
                  minWidth: '360px',
                  minHeight: '480px',
                }}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  style={{
                    width: '100%',
                  }}
                >
                  <Button
                    onClick={() => prev()}
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    title='Go back to "Learning Language" step'
                  />
                  <Title level={3}>
                    {learningLanguage?.greeting} {learningLanguage?.emoji}
                  </Title>
                  <div
                    // width of button to center the title
                    style={{
                      width: '64px',
                    }}
                  ></div>
                </Flex>
                <Flex
                  vertical
                  align="center"
                  style={{
                    marginTop: '32px',
                    width: '100%',
                  }}
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
                  <Divider
                    style={{
                      margin: '32px 0',
                    }}
                  >
                    <span
                      style={{
                        color: gray[5],
                        fontSize: '1rem',
                      }}
                    >
                      or
                    </span>
                  </Divider>
                  <Paragraph
                    style={{
                      color: gray[5],
                    }}
                  >
                    Signup With You Email
                  </Paragraph>
                  <Form
                    onFinish={onFinish}
                    style={{
                      width: '100%',
                    }}
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
                        style={{
                          width: '100%',
                        }}
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
      <LoginAndSignupPageLayout>
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
            style={{
              marginTop: 24,
              width: '100%',
            }}
          />
          <Flex
            vertical
            align="center"
            style={{
              marginTop: 48,
              width: '100%',
            }}
          >
            {steps[currentStep].content}
          </Flex>
        </Flex>
      </LoginAndSignupPageLayout>
    </>
  )
}

export default SignupPage

{
  /* <main className="rw-main">
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="emailOrUsername"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email or Username
                  </Label>
                  <TextField
                    name="emailOrUsername"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={emailOrUsernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email or Username is required',
                      },
                    }}
                  />

                  <FieldError
                    name="emailOrUsername"
                    className="rw-field-error"
                  />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main> */
}
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
        <Col span={6} key={language.value}>
          <Card
            // if cannot be selected, then not hoverable, otherwise hoverable
            hoverable={languageCannotBeSelected?.value !== language.value}
            title={language.label}
            onClick={() => {
              // if it cannot be selected, then do nothing
              if (languageCannotBeSelected?.value === language.value) {
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
                selectedLanguage && selectedLanguage.value === language.value
                  ? `2px solid ${blue[2]}`
                  : // if it cannot be selected, then it has a border
                  languageCannotBeSelected?.value === language.value
                  ? `2px solid ${gray[0]}`
                  : '2px solid transparent',
            }}
          >
            <Flex align="center" justify="center">
              <Image
                src={language.url}
                style={{
                  maxHeight: '100px',
                  maxWidth: '100px',
                }}
                preview={false}
              />
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
