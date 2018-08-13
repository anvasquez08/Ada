import React from 'react';

import NavBar from './NavBar.jsx';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';
import UploadComponent from './UploadComponent.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: true,
      isLoggedIn: false
    }
  }
  render() {
    return (
      <div>
      <NavBar />
      {
      //   this.state.showLoginModal ?
      // <Authentication /> : null
      }

      <Inventory />
      <UploadComponent/>
      </div>
      )
  }
}

export default App