import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AdminPage = () => {
  useEffect(() => {
    // go to dictionaries page
    navigate(routes.dictionaries())
  }, [])

  return (
    <>
      <MetaTags title="Admin" />
    </>
  )
}
export default AdminPage
