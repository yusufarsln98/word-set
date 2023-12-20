import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'

// import FoldersCell from 'src/components/FoldersCell/FoldersCell'

const FoldersPage = ({ userId }) => {
  return (
    <>
      <MetaTags title="Folders" description="Folders page" />
      <h1>FoldersPage</h1>
    </>
  )
}

export default FoldersPage
