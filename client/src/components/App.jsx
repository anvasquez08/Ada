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
        <div style={{margin: "30px"}}>
          {/* <div><Inventory/></div> */}
          <div><UploadComponent/></div>
        </div>
      </div>
      )
  }
}

export default App

// {
//   //   this.state.showLoginModal ?
//   // <Authentication /> : null
//   }
