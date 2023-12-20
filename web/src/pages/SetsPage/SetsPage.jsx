import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SetsPage = ({ userId }) => {
  return (
    <>
      <MetaTags title="Sets" description="Sets page" />

      <h1>SetsPage</h1>
      <p>
        Find me in <code>./web/src/pages/SetsPage/SetsPage.jsx</code>
      </p>
      <p>
        My default route is named <code>sets</code>, link to me with `
      </p>
    </>
  )
}

export default SetsPage
