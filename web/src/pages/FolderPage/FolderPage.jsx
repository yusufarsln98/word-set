import { useEffect, useState } from 'react'

import { gray } from '@ant-design/colors'
import {
  PlusOutlined,
  ShareAltOutlined,
  MoreOutlined,
  FolderOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Empty,
  Flex,
  Modal,
  Space,
  message,
  theme,
} from 'antd'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import {
  ADD_SET_TO_FOLDER_MUTATION,
  DELETE_FOLDER_MUTATION,
  FOLDER_QUERY,
  REMOVE_SET_FROM_FOLDER_MUTATION,
  USER_QUERY_SETS_UNDETAILED,
} from 'src/graphql_queries'
import { AVATAR_URL } from 'src/layouts/ApplicationLayout/ApplicationLayoutHeader/ApplicationLayoutHeader'

import styles from '../../Global.module.scss'

const FolderPage = ({ folderId }) => {
  const { currentUser } = useAuth()
  const {
    data: folderData,
    loading,
    error,
  } = useQuery(FOLDER_QUERY, {
    variables: { id: folderId },
  })
  const folder = folderData?.folder
  const [showAddSetModal, setShowAddSetModal] = React.useState(false)

  return (
    <>
      <MetaTags title="Folder" description="Folder page" />
      <FolderPageHeader
        folder={folder}
        setShowAddSetModal={setShowAddSetModal}
      />
      {folder?.sets.length > 0 ? (
        <Flex
          gap={24}
          style={{
            marginTop: 24,
          }}
          wrap="wrap"
        >
          {folder?.sets.map((set) => (
            <SetCard
              key={set.id}
              set={set}
              user={folder.user}
              folderId={folder.id}
            />
          ))}
        </Flex>
      ) : (
        <Flex
          align="center"
          justify="center"
          style={{
            width: '100%',
            minHeight: '500px',
          }}
          vertical
          gap={24}
        >
          <h2>There are no sets in this folder.</h2>
          <p
            style={{
              color: gray[6],
            }}
          >
            Organize all your Word Sets with folders.
          </p>
          <Button
            icon={<PlusOutlined />}
            type="dashed"
            size="large"
            onClick={() => {
              setShowAddSetModal(true)
            }}
          >
            Add a set
          </Button>
        </Flex>
      )}
      <AddSetModal
        folder={folder}
        showAddSetModal={showAddSetModal}
        setShowAddSetModal={setShowAddSetModal}
      />
    </>
  )
}

export default FolderPage

const BorderedButton = ({ children, ...rest }) => (
  <Button
    {...rest}
    type="text"
    style={{
      border: `1px solid ${gray[0]}`,
      ...rest.style,
    }}
  >
    {children}
  </Button>
)

const FolderPageHeader = ({ folder, setShowAddSetModal }) => {
  // delete folder mutation
  const [deleteFolder] = useMutation(DELETE_FOLDER_MUTATION, {
    onCompleted: () => {
      message.success('Folder deleted!')
      navigate(routes.folders({ userId: folder?.user.id }))
    },
  })

  return (
    <Flex vertical gap={24}>
      <Flex style={{ color: gray[6] }} align="center" justify="start" gap={48}>
        <p style={{ minWidth: 40 }}>
          {folder?.sets.length}
          <> </>
          {folder?.sets.length === 1 ? 'set' : 'sets'}
        </p>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Flex align="center" gap={16}>
            <p>created by </p>
            <Avatar
              src={AVATAR_URL[folder?.user.userConfig.defaultAvatarIndex]}
            />
            <Link to={routes.profile({ userId: parseInt(folder?.user.id) })}>
              <p
                style={{
                  color: gray[6],
                  fontWeight: 'bold',
                }}
              >
                {folder?.user.username}
              </p>
            </Link>
          </Flex>
          <Space>
            <BorderedButton
              size="large"
              shape="circle"
              icon={<PlusOutlined />}
              title="Add a set"
              onClick={() => {
                setShowAddSetModal(true)
              }}
            />
            <BorderedButton
              size="large"
              shape="circle"
              title="TODO: Share"
              icon={<ShareAltOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(`${window.location}`)
                message.success('Copied to clipboard!')
              }}
              disabled
            />
            <Dropdown
              arrow
              placement="bottomRight"
              trigger={['click']}
              menu={{
                items: [
                  {
                    danger: true,
                    label: (
                      <>
                        <Flex
                          onClick={() => {
                            deleteFolder({
                              variables: {
                                id: folder?.id,
                              },
                            })
                          }}
                        >
                          Delete Folder
                        </Flex>
                      </>
                    ),
                  },
                ],
              }}
            >
              <BorderedButton
                size="large"
                shape="circle"
                title="More"
                icon={
                  <MoreOutlined
                    style={{
                      rotate: '90deg',
                    }}
                  />
                }
              />
            </Dropdown>
          </Space>
        </Flex>
      </Flex>
      <Flex vertical>
        <Flex align="center" justify="start" gap={16}>
          <FolderOutlined
            style={{
              fontSize: '48px',
              color: gray[5],
            }}
          />
          <Flex vertical gap={4}>
            <h2>{folder?.title}</h2>
          </Flex>
        </Flex>
        <p
          style={{
            color: gray[6],
          }}
        >
          {folder?.description}
        </p>
      </Flex>
    </Flex>
  )
}

const AddSetModal = ({ folder, showAddSetModal, setShowAddSetModal }) => {
  // query
  const { currentUser } = useAuth()
  const { data: userData } = useQuery(USER_QUERY_SETS_UNDETAILED, {
    variables: { userId: currentUser.id },
  })
  const { sets } = userData?.user || []
  const [setsToAdd, setSetsToAdd] = useState([])

  const {
    token: { colorBgLayout, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    if (folder && sets) {
      const setsToAdd = sets.filter((set) => {
        return !folder.sets.some((folderSet) => folderSet.id === set.id)
      })

      setSetsToAdd(setsToAdd)
    }
  }, [sets, folder])

  // mutations
  const [addSetToFolder] = useMutation(ADD_SET_TO_FOLDER_MUTATION, {
    onCompleted: () => {
      message.success('Set added to folder!')
    },
    refetchQueries: [
      {
        query: FOLDER_QUERY,
        variables: { id: folder?.id },
      },
    ],
  })

  const [removeSetFromFolder] = useMutation(REMOVE_SET_FROM_FOLDER_MUTATION, {
    onCompleted: () => {
      message.success('Set removed from folder!')
    },
    refetchQueries: [
      {
        query: FOLDER_QUERY,
        variables: { id: folder?.id },
      },
    ],
  })

  const handleAddSetToFolder = (setId) => {
    addSetToFolder({
      variables: {
        id: folder.id,
        input: {
          setId,
        },
      },
    })
  }

  return (
    <Modal
      title={<h3>Add a set to Folder</h3>}
      open={showAddSetModal}
      footer={null}
      onOk={() => {
        setShowAddSetModal(false)
      }}
      onCancel={() => {
        setShowAddSetModal(false)
      }}
      style={{ padding: 0, borderRadius: borderRadiusLG }}
    >
      <Flex
        vertical
        align="center"
        gap={24}
        style={{
          padding: 24,
          background: colorBgLayout,
          borderRadius: borderRadiusLG,
        }}
      >
        <Card style={{ width: '100%' }}>
          <Flex align="center" justify="center">
            <Button type="link">
              <Link to={routes.createSet()}>Create a new set</Link>
            </Button>
          </Flex>
        </Card>
        <Flex
          vertical
          align="start"
          justify="start"
          style={{
            width: '100%',
            maxHeight: '400px',
            overflow: 'scroll',
          }}
          className={styles.hideScroll}
          gap={24}
        >
          {setsToAdd?.map((set) => (
            <Card key={set.id} size="small" style={{ width: '100%' }}>
              <Flex
                align="center"
                justify="space-between"
                style={{
                  width: '100%',
                }}
              >
                <h3>{set.title}</h3>
                <Button
                  onClick={() => {
                    // just add the set to the folder
                    handleAddSetToFolder(set.id)
                  }}
                  icon={<PlusOutlined />}
                  size="large"
                />
              </Flex>
            </Card>
          ))}

          {setsToAdd.length === 0 && (
            <Empty
              description="Create new set to add"
              style={{ width: '100%' }}
            />
          )}
        </Flex>
      </Flex>
    </Modal>
  )
}

const SetCard = ({ set, user, folderId }) => {
  const [removeSetFromFolder] = useMutation(REMOVE_SET_FROM_FOLDER_MUTATION, {
    onCompleted: () => {
      message.success('Set removed from folder!')
    },
    refetchQueries: [
      {
        query: FOLDER_QUERY,
        variables: { id: folderId },
      },
    ],
  })

  return (
    <Card
      className={styles.hoverable}
      style={{ width: '48%', borderRadius: '0', cursor: 'pointer' }}
      onClick={() => {
        navigate(routes.set({ setId: set.id }))
      }}
    >
      <Flex
        vertical
        style={{ width: '100%', height: '120px' }}
        justify="space-between"
      >
        <h3>{set.title}</h3>
        <Flex style={{ bottom: 0 }} align="center" justify="space-between">
          <Flex align="center" gap={8}>
            <Avatar src={AVATAR_URL[user.userConfig.defaultAvatarIndex]} />
            <p style={{ color: gray[6], fontWeight: 'bold' }}>
              {user.username}
            </p>
          </Flex>
          <Dropdown
            arrow
            placement="bottomRight"
            trigger={['click']}
            menu={{
              items: [
                {
                  danger: true,
                  label: (
                    <>
                      <Flex
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSetFromFolder({
                            variables: {
                              id: folderId,
                              input: {
                                setId: set.id,
                              },
                            },
                          })
                        }}
                      >
                        Remove from folder
                      </Flex>
                    </>
                  ),
                },
              ],
            }}
          >
            <Button
              type="text"
              // prevent default dropdown menu
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <MoreOutlined />
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
    </Card>
  )
}
