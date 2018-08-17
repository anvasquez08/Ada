import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="ui secondary pointing menu">
        <div className="left menu">{this.props.user ? <a className="item">{this.props.user}</a> : null}</div>

        <div className="right menu">
          <a className="ui item active">Home</a>
          <a className="item">Discover</a>
          <a className="item">Friends</a>
          {this.props.user ? <a className="item" href="/auth/logout">Logout</a> : <a className="item" href="/auth/instagram">Sign in with Instagram</a>}
        </div>
          
      </div>
    )
  }
}

export default NavBar;