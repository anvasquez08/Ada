import React from 'react';

import NavBar from './NavBar.jsx';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: true
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
      </div>
      )
  }
}

export default App