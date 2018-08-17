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
          <div className="right menu">
            <a className="ui item active">{this.props.isLoggedIn ? "Home" : "Login"}</a>
            <a className="item">Instagram</a>
            <a className="item">Discover</a>
            <a className="item">More</a>
          </div>
        </div>
    )
  }
}


export default NavBar;
