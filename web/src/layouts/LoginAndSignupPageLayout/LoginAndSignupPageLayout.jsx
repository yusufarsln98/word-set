import { useEffect } from 'react'

import { Flex, Image, Layout, theme } from 'antd'

import { Link, navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const { Header, Content } = Layout

const LoginAndSignupPageLayout = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const {
    token: { colorBgContainer, colorBorder, boxShadowTertiary },
  } = theme.useToken()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <Layout className="layout">
      <Header
        style={{
          background: colorBgContainer,
          userSelect: 'none',
          borderBottom: `1px solid ${colorBorder}`,
          boxShadow: boxShadowTertiary,
        }}
      >
        <Flex justify="space-between" align="center">
          <Flex justify="flex-start" align="center">
            <Link
              to={routes.home()} // later can be changed with routes.latest()
            >
              <Image
                src="/logo/Logo-Horizontal.svg"
                preview={false}
                height={64}
              />
            </Link>
          </Flex>
        </Flex>
      </Header>
      <Content
        style={{
          minHeight: 'calc(100vh - 64px)',
          minWidth: '100%',
          padding: '0 50px', // 0 for top and bottom, 50px for left and right
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}

export default LoginAndSignupPageLayout
