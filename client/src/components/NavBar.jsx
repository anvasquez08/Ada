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
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
            <Typography variant="title" color="inherit">
              {this.props.user ?
                <div>Signed in: {this.props.user} || <a href="/auth/logout">Logout</a></div>:
                <button onClick={this.props.handleLogin}>Login</button>}
            </Typography>
            </Toolbar>
          </AppBar></div>
      )
    }
}

export default NavBar;