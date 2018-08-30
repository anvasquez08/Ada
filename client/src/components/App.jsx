import React from 'react';
import axios from 'axios';
import Landing from './Landing.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import Inventory from './Inventory.jsx';
import '../styles/css/main.css'
import PhotoSelector from './PhotoSelector.jsx';
import Style from './Style.jsx';
import Favorites from './Favorites.jsx';
import { Switch, Route, withRouter } from 'react-router-dom'
import LoginModal from './LoginModal.jsx';
import Discover from './Discover.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offSetY: 0,
      showLoginModal: false,
      isLoggedIn: false,
      imageUrl: '',
      user: '',
      inventory: [],
      brands: [],
      currentPage: 'home',
      loginType: '',
      modalActive: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleImageUrl = this.handleImageUrl.bind(this);
    this.handleScroll = this.handleScroll.bind(this)
    this.handleAppBrandChange = this.handleAppBrandChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    // check if there is an active user session
    axios.get('/auth/current_user')
      .then((result) => this.setState({user: result.data, isLoggedIn: true}))
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    var offSetY = window.scrollY;
    // console.log(offSetY)
    this.setState({offSetY})
  }

  handleLogin() {
    this.setState({ showLoginModal: !this.state.showLoginModal });
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
    // console.log(val)
    await this.setState({brands: val})
  }

  handleImageUrl(e) {
    this.setState({
      imageUrl: e.target.value
    })
  }

  toggleModal() {
    this.setState({
      modalActive: !(this.state.modalActive)
    })
  }

  render() {
    return (
      <div>
        <NavBar 
        currentPage={this.props.history.location.pathname}
        offSetY={this.state.offSetY}
        user={this.state.user}
        toggleModal={this.toggleModal}/>
        <LoginModal
        toggleModal={this.toggleModal}
        modalActive={this.state.modalActive}/>
        <div className="Main">
          <div>
            <Switch>
              <Route exact path='/'
                render={(props) => <Landing {...props}
                username={this.state.user}/>}/>
              <Route path='/detect'
                render={(props) => <Inventory {...props}
                handleStateChange={this.handleStateChange}
                handleImageUrl={this.handleImageUrl}
                imageUrl={this.state.imageUrl}
                inventory={this.state.inventory}
                brands={this.state.brands}
                username={this.state.user} 
                handleAppBrandChange={this.handleAppBrandChange}/>}/>
              <Route exact path='/trending'
                render={(props) => <Discover {...props}
                username={this.state.user}/>}/>
              <Route exact path='/style'
                render={(props) => <Style {...props}
                username={this.state.user}/>}/>
              <Route exact path='/favorites'
                render={(props) => <Favorites {...props}
                username={this.state.user}/>}/>
              <Route exact path='/insta'
                render={(props) => <PhotoSelector {...props}
                handleStateChange={this.handleStateChange}
                handleImageUrl={this.handleImageUrl}
                imageUrl={this.state.imageUrl}
                inventory={this.state.inventory}
                brands={this.state.brands}
                username={this.state.user}
                handleAppBrandChange={this.handleAppBrandChange}/>}/>
              <Route exact path='/fb'
                render={(props) => <PhotoSelector {...props}
                username={this.state.user}/>}/>

            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
const ShowTheLocationWithRouter = withRouter(App)
// // withRouter(connect(...)(App))
export default App