import React from 'react';
import axios from 'axios';

import NavBar from './NavBar.jsx';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';
import Modal from '@material-ui/core/Modal';
import UploadComponent from './UploadComponent.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: true,
      isLoggedIn: false,
      user: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({showLoginModal: !this.state.showLoginModal});
  }

  componentDidMount() {
    axios.get('/auth/current_user')
      .then((result) => 
      this.setState({user: result.data, isLoggedIn: true}));
  }


  render() {
    return (
      <div>
      
      <button onClick={this.handleLogin}>Login</button>

      <Modal open={this.state.showLoginModal} onClose={this.handleLogin}>
      <div style={{background: 'grey', color: 'white'}}>
        <Authentication user={this.state.user}/>
      </div>
      </Modal>
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