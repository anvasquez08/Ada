import React from 'react';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';
import Header from '../components/Header.jsx'
import Landing from '../components/Landing.jsx'
import '../styles/css/main.css'

import { Query } from "react-apollo";
import gql from "graphql-tag";

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
        <Header/>
        <Landing/>
        {this.state.showLoginModal ?
        <Authentication /> : null
        }
        <Inventory />
        </div>
      )
  }
}

export default App