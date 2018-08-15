import React from 'react'

class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'username',
      password: 'password'
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
    <div>
      <div><a href="/auth/instagram"><button>Sign in with Instagram</button></a></div><br />
      <div>Login or Sign up for a new account</div><br />
      Username: <input type="text" value={this.state.username} onChange={this.handleUsername}></input><br />
      Password: <input type="password" value={this.state.password} onChange={this.handlePassword}></input><br />
      <button style={{color: 'black'}}>Login / Signup</button><br />

      
    </div>
    )
  }
}

export default Authentication;