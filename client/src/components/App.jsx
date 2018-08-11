import React from 'react';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';

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

      {this.state.showLoginModal ?
      <Authentication /> : null
      }

      <Inventory />

      </div>
      )
  }
}

export default App