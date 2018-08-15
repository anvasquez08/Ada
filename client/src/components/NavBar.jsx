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