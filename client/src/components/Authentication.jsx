import React from 'react'

class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'TestUsername',
      password: 'TestPassword'
    }
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
      {/* Username:
      <input type="text" value={this.state.username} onChange={this.handleUsername}></input>
      Password:
      <input type="password" value={this.state.password} onChange={this.handlePassword}></input><br /> */}

      Sign in with <a href="/auth/instagram">Instagram</a>
    </div>
    )}
}

export default Authentication;