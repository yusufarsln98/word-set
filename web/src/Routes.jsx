// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import {
  Router,
  Route,
  PrivateSet,
  Set,
  // Set // When layout is needed, this will be used
} from '@redwoodjs/router'

import LoginAndSignupPageLayout from 'src/layouts/LoginAndSignupPageLayout/LoginAndSignupPageLayout'

import { useAuth } from './auth'
import ApplicationLayout from './layouts/ApplicationLayout/ApplicationLayout'
import ProfileLayout from './layouts/ProfileLayout/ProfileLayout'

const Routes = () => {
  // const user = useAuth().currentUser
  return (
    <Router useAuth={useAuth}>
      <Set wrap={LoginAndSignupPageLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <PrivateSet unauthenticated="home" wrap={ApplicationLayout}>
        <Route path="/latest" page={LatestPage} name="latest" />
        <PrivateSet unauthenticated="home" wrap={ProfileLayout}>
          <Route path="/user/{userId:Int}/recent-activities" page={ProfilePage} name="profile" />
          <Route path="/user/{userId:Int}/folders" page={FoldersPage} name="folders" />
          <Route path="/user/{userId:Int}/sets" page={SetsPage} name="sets" />
          <Route path="/user/{userId:Int}/settings" page={SettingsPage} name="settings" />
        </PrivateSet>
      </PrivateSet>
      <PrivateSet unauthenticated="home" roles="ADMIN">
        <Route path="/admin" page={AdminPage} name="admin" />
      </PrivateSet>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
