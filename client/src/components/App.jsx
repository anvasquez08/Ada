import React from 'react';
import axios from 'axios';

import NavBar from './NavBar.jsx';
import Authentication from '../components/Authentication.jsx';
import Inventory from '../components/Inventory.jsx';
// import Header from '../components/Header.jsx'
import '../styles/css/main.css'
// import Modal from '@material-ui/core/Modal';
import UploadComponent from './UploadComponent.jsx';

import Instagram from '../components/Instagram.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: false,
      isLoggedIn: false,
      user: '',
      inventory: [], 
      brands: [],
      instagramResults: []
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount() {
    // axios.get('/auth/current_user')
    //   .then((result) => 
    //   this.setState({user: result.data, isLoggedIn: true}))
    //   .then(() => {
    //     axios.get('/auth/media')
    //     .then((result) => {
    //       console.log('Getting back to client: ', result)
    //       this.setState({instagramResults: result.data.data})
    //     })
    //   })
  }

  handleLogin() {
    this.setState({showLoginModal: !this.state.showLoginModal});
  }

  handleStateChange(key, val) {
    let brands = val.map(({brandName}) => brandName)
    this.setState({[key]: val, brands: [...new Set(brands)]})
  }


  render() {
    return (
      <div>
      <NavBar user={this.state.user}/>
        <div style={{margin: "30px"}}>
          <div>
              <Inventory 
              handleStateChange={this.handleStateChange} 
              inventory={this.state.inventory}
              brands={this.state.brands}/>
            </div>
      <Instagram photos={this.state.instagramResults}/>
        </div>
      </div>
      )
  }
}

export default App