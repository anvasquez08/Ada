import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="ui secondary pointing menu">
        <div className="left menu">{this.props.user ? <a className="item">{this.props.user}</a> : null}</div>

        <div className="right menu">
          <a className="ui item active" onClick={this.props.loadHomePage}>Home</a>
          <a className="item" onClick={this.props.loadStylePage}>
            My Style
          </a>
          <a className="item" onClick={this.props.loadFavoritesPage}>Favorites</a>
          {this.props.user ? <a className="item" href="/auth/logout">Logout</a> : <a className="item" href="/auth/instagram">Sign in with Instagram</a>}
        </div>
          
      </div>
    )
  }
}

export default NavBar;