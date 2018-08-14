import React from 'react';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';
import UploadComponent from './UploadComponent.jsx';

import { Query } from "react-apollo";
import gql from "graphql-tag";

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
      <UploadComponent/>
      </div>
      )
  }
}

export default App