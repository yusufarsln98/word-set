import { MoreOutlined } from '@ant-design/icons'
import { Button, Space, Table, message } from 'antd'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'

import { DELETE_WORD_MUTATION, QUERY_DICTIONARY } from 'src/graphql_queries'

const WordsPage = ({ dictionaryId }) => {
  const { data, error, loading } = useQuery(QUERY_DICTIONARY, {
    variables: {
      id: dictionaryId,
    },
  })

  const [deleteWord, { loading: deleteWordLoading, error: deleteWordError }] =
    useMutation(DELETE_WORD_MUTATION, {
      onCompleted: (_) => {
        message.success('Word deleted!')
      },
    })

  const onClick = async (id) => {
    deleteWord({
      variables: {
        id,
      },
    })
  }

  const columns = [
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
      render: (text, record) => <Link>{text}</Link>,
    },
    {
      title: 'Search',
      dataIndex: 'search',
      key: 'search',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button danger onClick={() => onClick(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ]

  return (
    <>
      <MetaTags title="Words" description="Words page" />
      <Table
        title={() => <h2>{data?.dictionary?.name} Dictionary</h2>}
        // set keys to each word then add to the dataSource
        dataSource={data?.dictionary?.words.map((word) => {
          return {
            ...word,
            key: word.id,
          }
        })}
        columns={columns}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <Space direction="vertical">
              {record.meanings.map((meaning) => (
                <p key={meaning.id}>{meaning.definition}</p>
              ))}
            </Space>
          ),
          rowExpandable: (record) => record?.meanings?.length > 0,
        }}
        bordered
      />
    </>
  )
}

export default WordsPage
