import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ui secondary pointing fixed menu" 
        style={{backgroundColor: this.props.offSetY <= 44 && this.props.currentPage === '/' ? "transparent" : "#fff9f6",
                borderBottomWidth: this.props.offSetY <= 44 && this.props.currentPage === '/' ? 0 : 1,
                transition: "background-color 200ms linear"}}>
      
        <div className="left menu">{this.props.user ? <a className="item">{this.props.user}</a> : null}</div>

        <div className="right menu">
          <span className={this.props.currentPage === '/' ? "ui item active" : "item"}>
            <Link className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "transparent" : "normal"} to='/'>Home</Link></span>
          <span className={this.props.currentPage === 'style' ? "ui item active" : "item"}>
            <Link className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "transparent" : "normal"} to='/style'>My Style</Link></span>
          <span className={this.props.currentPage === 'favorites' ? "ui item active" : "item"}>
            <Link className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "transparent" : "normal"} to='/favorites'>Favorites</Link></span>
            <span className={this.props.currentPage === 'favorites' ? "ui item active" : "item"}>
            <Link className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "transparent" : "normal"} to='/trending'>Trending Styles</Link></span>
          <span className="item">
            {this.props.user 
            ? <a className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "transparent" : "normal"} href="/auth/logout">Logout</a>
            : <a className={this.props.offSetY <= 44 && this.props.currentPage === '/' ? "transparent" : "normal"} onClick={this.props.toggleModal}>Sign in</a>}
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