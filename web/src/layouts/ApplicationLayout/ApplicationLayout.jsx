import {
  Flex,
  Layout,
  theme,
  //
} from 'antd'

import ApplicationLayoutHeader from './ApplicationLayoutHeader/ApplicationLayoutHeader'

const { Content, Footer } = Layout

// breakpoints
// {
//   xs: '480px',
//   sm: '576px',
//   md: '768px',
//   lg: '992px',
//   xl: '1200px',
//   xxl: '1600px',
// }

const ApplicationLayout = ({ children }) => {
  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken()

  return (
    <>
      <Layout className="layout">
        <ApplicationLayoutHeader />
        <Content
          style={{
            minHeight: 'calc(100vh - 64px)', // 64px is the height of the header
            padding: '0 50px', // 0 for top and bottom, 50px for left and right
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            borderTop: `1px solid ${colorBorder}`,
            background: colorBgContainer,
          }}
        >
          <Flex justify="center" align="center">
            WordSet © 2023
          </Flex>
        </Footer>
      </Layout>
    </>
  )
}

export default ApplicationLayout
