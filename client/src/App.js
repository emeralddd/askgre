import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Logout from './components/auth/Logout'
import Auth from './views/Auth'
import Homepage from './views/Homepage'
import ProtectedRoute from './components/routing/ProtectedRoute'
import PublicRoute from './components/routing/PublicRoute'
import AuthContextProvider from './contexts/authContext'
import MemberContextProvider from './contexts/memberContext'
import QueueContextProvider from './contexts/queueContext'
import UserContextProvider from './contexts/userContext'
import Single from './views/Single'
import './App.css'
import './css/headfoot.css'
import './css/homepage.css'
import './css/dashboard.css'
import './css/sidebar.css'
import './css/extend.css'
import './css/login.css'
import CheckDeadline from './admin/CheckDeadline'
import VerifyQueueManager from './admin/VerifyQueueManager'
import MemberManager from './admin/MemberManager'
import UpdateTask from './admin/UpdateTask'
import UserManager from './admin/UserManager'

function App() {
  return (
    <AuthContextProvider>
      <MemberContextProvider>
        <QueueContextProvider>
          <UserContextProvider>
            <Router>
              <Switch>
                <Route exact path='/login' render= {props => <Auth {...props} authRoute='login' />} />
                <Route exact path='/logout' component={Logout} />
                <PublicRoute exact path='/' component={Homepage} />
                <ProtectedRoute exact path='/dashboard' component={Dashboard} />
                <ProtectedRoute exact path='/checkdeadline' component={CheckDeadline} />
                <ProtectedRoute exact path='/verifyqueuemanager' component={VerifyQueueManager} />
                <ProtectedRoute exact path='/membermanager' component={MemberManager} />
                <ProtectedRoute exact path='/usermanager' component={UserManager} />
                <ProtectedRoute exact path='/updatetask' component={UpdateTask} />
                <PublicRoute path='/single/:_id' component={Single} />
              </Switch>
            </Router>
          </UserContextProvider>
        </QueueContextProvider>
      </MemberContextProvider>
    </AuthContextProvider>
  )
}

export default App