import React from 'react';
import axios from 'axios';
import Landing from './Landing.jsx';
import NavBar from './NavBar.jsx';
import Inventory from './Inventory.jsx';
import '../styles/css/main.css'
import Instagram from './Instagram.jsx';
import Style from './Style.jsx';
import Favorites from './Favorites.jsx';
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offSetY: 0,
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
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    // check if there is an active user session
    axios.get('/auth/current_user')
      .then((result) => this.setState({ user: result.data, isLoggedIn: true }))
      .then(() => {
        // if there is an active user session, pull user's instagram photos
        if (this.state.user) {
          axios.get('/auth/media')
            .then((result) => { this.setState({ instagramResults: result.data.data }) })
        }
      })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    var offSetY = window.scrollY;
    console.log(offSetY)
    this.setState({offSetY})
  }

  handleLogin() {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  handleStateChange(key, val) {
    let brands = val.map(({ brandName }) => brandName)
    this.setState({ [key]: val, brands: [...new Set(brands)] })
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
      <NavBar 
      currentPage={this.state.currentPage}
      offSetY={this.state.offSetY}
      user={this.state.user}
      loadStylePage={this.loadStylePage}
      loadHomePage={this.loadHomePage}
      loadFavoritesPage={this.loadFavoritesPage}/>
        <div className="Main">
          <div>
            <Switch>
              <Route exact path='/'
                render={(props) => <Landing {...props}
                username={this.state.user}/>}/>
              <Route path='/detect'
                render={(props) => <Inventory {...props}
                handleStateChange={this.handleStateChange} 
                inventory={this.state.inventory}
                brands={this.state.brands}
                username={this.state.user}/>}/>
              <Route path='/style'
                render={(props) => <Style {...props}
                username={this.state.user}/>}/>
              <Route path='/favorites'
                render={(props) => <Favorites {...props}
                username={this.state.user}/>}/>
              <Route path='/insta'
                render={(props) => <Instagram {...props}
                photos={this.state.instagramResults}
                username={this.state.user}/>}/>
            </Switch>
          </div>
        </div>
        {/* <Instagram photos={this.state.instagramResults}/> */}
      </div>
    )
  }
}

export default App