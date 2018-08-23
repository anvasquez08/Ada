import React from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import Inventory from './Inventory.jsx';
import '../styles/css/main.css'
import Instagram from './Instagram.jsx';
import Style from './Style.jsx';
import Favorites from './Favorites.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: false,
      isLoggedIn: false,
      user: '',
      inventory: [], 
      brands: [],
      instagramResults: [],
      currentPage: 'home'
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.loadStylePage = this.loadStylePage.bind(this);
    this.loadHomePage = this.loadHomePage.bind(this);
    this.loadFavoritesPage = this.loadFavoritesPage.bind(this);
    this.handleAppBrandChange = this.handleAppBrandChange.bind(this);
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
    //   }).catch((err) => {
    //     console.log('auth error', err.data);
    //   })
  }

  handleLogin() {
    this.setState({showLoginModal: !this.state.showLoginModal});
  }

  handleStateChange(key, val) {
    let brands = val.map(({brandName}) => brandName)
    let filteredBrands = [...new Set(brands)]
    let arrOfObjs = filteredBrands.map((name) => {
      return {brandName: name, isSelected: false}
    })

    this.setState({[key]: val, brands: arrOfObjs})
  }

  async handleAppBrandChange(val) {
    console.log(val)
    await this.setState({brands: val})
  }

  loadStylePage() {
    this.setState({
      currentPage: 'style'
    })
  }

  loadHomePage() {
    this.setState({
      currentPage: 'home'
    })
  }

  loadFavoritesPage() {
    this.setState({
      currentPage: 'favorites'
    })
  }


  render() {
    return (
      <div>
      <NavBar user={this.state.user}
      loadStylePage={this.loadStylePage}
      loadHomePage={this.loadHomePage}
      loadFavoritesPage={this.loadFavoritesPage}/>
        <div style={{margin: "30px"}}>
          <div>
            <div style={(this.state.currentPage === 'home') ? {display: 'block'} : {display: 'none'}}>
              <Inventory 
              handleStateChange={this.handleStateChange} 
              inventory={this.state.inventory}
              brands={this.state.brands}
              username={this.state.user}
              handleAppBrandChange={this.handleAppBrandChange}/>
            </div>
            {/* <div style={this.state.currentPage === 'style' ? {display: 'block'} : {display: 'none'}}>
              <Style 
              username={this.state.user}/>
            </div>
            <div style={this.state.currentPage === 'favorites' ? {display: 'block'} : {display: 'none'}}>
              <Favorites 
              username={this.state.user}/>
            </div>
          </div>
        <div style={this.state.currentPage === 'insta' ? {display: 'block'} : {display: 'none'}}>
          <Instagram 
          photos={this.state.instagramResults}/> */}
        </div>
      </div>
    </div>
      )
  }
}

export default App