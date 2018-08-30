import React from 'react';
import { Link, withRouter } from 'react-router-dom'



class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ui secondary pointing fixed menu" 
        style={{backgroundColor: this.props.offSetY <= 44 && this.props.location.pathname === '/' ? "normal" : "#fff9f6",
                borderBottomWidth: this.props.offSetY <= 44 && this.props.location.pathname === '/' ? 0 : 1,
                transition: "background-color 200ms linear"}}>
      
        {/* <div className="left menu">{this.props.user ? <a className="item">{this.props.user}</a> : null}</div> */}

        <div className="right menu">
          <span className={this.props.location.pathname === '/detect' ? "ui item active" : "item"}>
            <Link className={this.props.offSetY <= 44 && this.props.location.pathname === '/detect' ? "normal" : "normal"} to='/detect'>Search</Link></span>
          <span className={this.props.location.pathname === '/style' ? "ui item active" : "item"} style={this.props.user ? {display: 'block'} : {display: 'none'}}>
            <Link className={this.props.offSetY <= 44 && this.props.location.pathname === '/style' ? "normal" : "normal"} to='/style'>My Style</Link></span>
          <span className={this.props.location.pathname === '/favorites' ? "ui item active" : "item"} style={this.props.user ? {display: 'block'} : {display: 'none'}}>
            <Link className={this.props.offSetY <= 44 && this.props.location.pathname === '/favorites' ? "normal" : "normal"} to='/favorites'>Wish List</Link></span>
            <span className={this.props.location.pathname === '/trending' ? "ui item active" : "item"}>
            <Link className={this.props.offSetY <= 44 && this.props.location.pathname === '/trending' ? "normal" : "normal"} to='/trending'>Trending Styles</Link></span>
          <span className="item">
            {this.props.user 
            ? <a className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "normal" : "normal"} href="/auth/logout">Logout</a>
            : <a className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "normal" : "normal"} onClick={this.props.toggleModal}>Sign in</a>}
          </span>
          <span className="item">{this.props.user}</span>
        </div>
      </div>
    )
  }
}

export default withRouter(NavBar);


// Code it so that this.props.currentPage === 'home', 'style', 'favorites'
// {this.props.currentPage === 'home' 
//   ? <span className="ui item active"><Link to='/'>Home</Link></span>
//   : <span className="item"><Link to='/'>Home</Link></span>
// }