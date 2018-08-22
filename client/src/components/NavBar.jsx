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
          <span className="ui item active"><Link to='/'>Home</Link></span>
          <span className="item"><Link to='/style'>My Style</Link></span>
          <span className="item"><Link to='/favorites'>Favorites</Link></span>
          {this.props.user 
            ? <span className="item"><a href="/auth/logout">Logout</a></span> 
            : <span className="item"><a href="/auth/instagram">Sign in with Instagram</a></span>}
        </div>
          
      </div>
    )
  }
}

export default NavBar;