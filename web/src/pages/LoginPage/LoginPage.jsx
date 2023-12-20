import { useRef } from 'react'
import { useEffect } from 'react'

import { gray } from '@ant-design/colors'
import { GoogleOutlined } from '@ant-design/icons'
import {
  Flex,
  Button,
  Input,
  Space,
  theme,
  Form,
  message,
  Divider,
  Card,
} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { logIn, loading } = useAuth()
  const {
    token: { colorLink },
  } = theme.useToken()

  const emailOrUsernameRef = useRef(null)
  useEffect(() => {
    emailOrUsernameRef.current?.focus()
  }, [])

  const onFinish = async (data) => {
    const response = await logIn({
      username: data.emailOrUsername,
      password: data.password,
    }).finally(() => {})

    if (response.message) {
      message(response.message)
    } else if (response.error) {
      message.error(response.error)
    } else {
      message.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <Flex justify="center" align="center" height="100%">
        <Card
          bordered={false}
          // hide shadow
          style={{
            boxShadow: 'none',
            marginTop: '64px',
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
            <Title level={2}>Login</Title>
            <Flex
              vertical
              align="center"
              style={{
                marginTop: '32px',
                width: '100%',
              }}
            >
              <Paragraph>
                Don&apos;t have an account? {/* link with underline */}
                <Paragraph
                  style={{
                    display: 'inline',
                    textDecoration: 'underline',
                    color: colorLink,
                  }}
                >
                  <Link color={colorLink} to={routes.signup()}>
                    Sign up!
                  </Link>
                </Paragraph>
              </Paragraph>
              <Button icon={<GoogleOutlined />} size="large">
                Login with your Google account
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
                      message: 'Email or Username is required',
                    },
                  ]}
                >
                  <Input
                    ref={emailOrUsernameRef}
                    placeholder="Email or Username"
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
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Space
                    direction="vertical"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Link to={routes.forgotPassword()}>Forgot Password?</Link>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: '100%',
                      }}
                      loading={loading}
                    >
                      Login
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default LoginPage
