import React from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
      return (
        <div className="ui secondary pointing menu">
          <div className="right menu">
            <a className="ui item active">Home</a>
            <a className="item">Discover</a>
            <a className="item">Friends</a>
            <a className="item">More</a>
          </div>
        </div>
      )
    }
}

export default NavBar;

/*
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
>>>>>>> a26d7a9923f0f11effcd0c33b769997fd6ff4512
*/