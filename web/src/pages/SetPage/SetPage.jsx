import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SetPage = ({ setId }) => {
  return (
    <>
      <MetaTags title="Set" description="Set page" />

      <h1>SetPage</h1>
      <p>
        Find me in <code>./web/src/pages/SetPage/SetPage.jsx</code>
      </p>
    </>
  )
}

export default SetPage
