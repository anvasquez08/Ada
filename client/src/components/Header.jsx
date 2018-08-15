import React from 'react' 
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class Header extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <AppBar position='sticky' style={{backgroundColor:'#f8f8f8', borderRadius:0, marginBottom:"0px", borderWidth:"0px", fontSize:"125%", boxShadow: "0 1px 1px #D3D3D3"}}>
        <Toolbar>
          <IconButton style={{color:"#3f3f3f"}} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" style={{color:"#3f3f3f", fontSize:"150%", flexGrow: 1}}>
            bAI
          </Typography>
          {this.props.user ?
            <div>Signed in: {this.props.user} || <a href="/auth/logout">Logout</a></div>:
            <a href='#' style={{textDecoration: 'none'}}onClick={this.props.handleLogin}>Login</a>}
        </Toolbar>
      </AppBar>
    )
  }
}