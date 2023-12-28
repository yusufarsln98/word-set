import React, { useEffect, useState } from 'react'

import { HappyProvider } from '@ant-design/happy-work-theme'
import { BookOutlined } from '@ant-design/icons'
// import { Language } from '@prisma/client'
import { Button, Flex, Input, Table, message } from 'antd'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'

import {
  CREATE_DICTIONARY_MUTATION,
  QUERY_DICTIONARIES,
} from 'src/graphql_queries'

import styles from '../../Global.module.scss'

const Language = {
  English: 'English',
  French: 'French',
  Turkish: 'Turkish',
  Spanish: 'Spanish',
  German: 'German',
  Italian: 'Italian',
  Portuguese: 'Portuguese',
  Japanese: 'Japanese',
}

const DictionariesPage = () => {
  // there are 8 languages and 56 combinations of languages
  // this page creates dictionaries for all of them if they don't exist
  const [
    createDictionary,
    { loading: createDictionariesLoading, error: createDictionariesError },
  ] = useMutation(CREATE_DICTIONARY_MUTATION, {
    onCompleted: (_) => {
      message.success('Dictionary created!')
    },
  })

  const {
    data: dictonaries,
    error: queryDictionariesError,
    loading: queryDictionariesLoading,
  } = useQuery(QUERY_DICTIONARIES, {
    variables: {},
  })

  // $title: String!
  const onClick = async () => {
    // create dictionaries for each combination of languages
    // 8 languages
    const languages = Object.values(Language)
    // 56 combinations
    const combinations = []
    languages.forEach((language) => {
      languages.forEach((language2) => {
        if (language !== language2) {
          combinations.push([language, language2])
        }
      })
    })

    // create dictionaries
    combinations.forEach((combination) => {
      const title = `${combination[0]}-${combination[1]}`
      createDictionary({
        variables: {
          name: title,
          termsLanguage: combination[0],
          translationsLanguage: combination[1],
        },
      })
    })
  }

  console.log(dictonaries) // name, termsLanguage, translationsLanguage
  return (
    <>
      <MetaTags title="Admin" />
      <Flex vertical>
        <HappyProvider>
          <Button
            size="large"
            onClick={onClick}
            loading={createDictionariesLoading}
            disabled={dictonaries?.dictionaries?.length === 56}
          >
            Create all dictonaries!
          </Button>
        </HappyProvider>
        <Table
          title={() => <h2>Dictionaries</h2>}
          // click on row
          onRow={(record) => {
            return {
              onClick: () => {
                // route to words page
                // /admin/dictionaries/{dictionaryId:Int}/words
                navigate(routes.words({ dictionaryId: record.id }))
              }, // click row
            }
          }}
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Terms Language',
              dataIndex: 'termsLanguage',
              key: 'termsLanguage',
            },
            {
              title: 'Translations Language',
              dataIndex: 'translationsLanguage',
              key: 'translationsLanguage',
            },
          ]}
          dataSource={dictonaries?.dictionaries}
          style={{
            marginTop: 28,
            width: '100%',
          }}
          // row cursor
          rowClassName={styles.cursorPointer}
          bordered
          loading={queryDictionariesLoading}
        />
      </Flex>
    </>
  )
}
export default DictionariesPage
