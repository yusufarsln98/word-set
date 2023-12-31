import { Flex } from 'antd'

const SetAndFolderLayout = ({ children }) => {
  return (
    <Flex
      vertical
      style={{
        padding: '0 32px',
        margin: '48px 0',
        width: '1200px',
      }}
    >
      {children}
    </Flex>
  )
}

export default SetAndFolderLayout
