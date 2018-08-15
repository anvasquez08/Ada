import React from 'react';
import axios from 'axios';

import NavBar from './NavBar.jsx';
// import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';
// import Header from '../components/Header.jsx'
// import Landing from '../components/Landing.jsx'
import '../styles/css/main.css'
// import Modal from '@material-ui/core/Modal';
import UploadComponent from './UploadComponent.jsx';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: false,
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

      <NavBar />
      <div style={{margin: "30px"}}>
        {/* <div><Inventory/></div> */}
        <div><UploadComponent/></div>
      </div>
      <NavBar />

      {/* <Header user={this.state.user} handleLogin={this.handleLogin}/>
      <Landing/>
      <Modal open={this.state.showLoginModal} onClose={this.handleLogin}>
        <div style={{background: 'grey', color: 'white'}}>
          <Authentication user={this.state.user}/>
        </div>
      </Modal>
      <Inventory /> */}

      </div>
      )
  }
}

export default App

