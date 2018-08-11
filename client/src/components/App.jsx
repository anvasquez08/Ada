import React from 'react';
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
<<<<<<< HEAD

      {this.state.showLoginModal ?
      <Authentication /> : null
      }

      <Inventory />

=======
        Test
>>>>>>> master
      </div>
      )
  }
}

export default App