import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="ui secondary pointing menu">
      
        <div className="left menu">{this.props.user ? <a className="item">{this.props.user}</a> : null}</div>

        <div className="right menu">
        <span className={this.props.currentPage === 'home' ? "ui item active" : "item"} onClick={this.props.loadHomePage}>
          <Link to='/'>Home</Link></span>
        <span className={this.props.currentPage === 'style' ? "ui item active" : "item"} onClick={this.props.loadStylePage}>
          <Link to='/style'>My Style</Link></span>
        <span className={this.props.currentPage === 'favorites' ? "ui item active" : "item"} onClick={this.props.loadFavoritesPage}>
          <Link to='/favorites'>Favorites</Link></span>
        <span className="item">
          {this.props.user ? <a href="/auth/logout">Logout</a> : <a href="/auth/instagram">Sign in with Instagram</a>}
        </span>

        </div>
          
      </div>
    )
  }
}

export default NavBar;


// Code it so that this.props.currentPage === 'home', 'style', 'favorites'


// {this.props.currentPage === 'home' 
//   ? <span className="ui item active"><Link to='/'>Home</Link></span>
//   : <span className="item"><Link to='/'>Home</Link></span>
// }