import React from 'react';
import PastEmail from './components/PastEmail'
import SendEmail from './components/SendEmail'
import Navbar from './components/Navbar'
import Firebase from './components/Firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/past">
              <Navbar />
              <PastEmail db={Firebase.firestore()}/>
            </Route>
            <Route path="/">
              <Navbar />
              <SendEmail db={Firebase.firestore()}/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App