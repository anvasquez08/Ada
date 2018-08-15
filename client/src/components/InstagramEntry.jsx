import React from 'react';

class InstagramEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleStyle: true
    }
    this.toggleStyle = this.toggleStyle.bind(this);
  }

  toggleStyle() {
    this.setState({
      toggleStyle: !this.state.toggleStyle
    })
  }

  render() {
    return (
      <img onClick={() => {this.toggleStyle(); this.props.select(this.props.photo.images.low_resolution.url)}} style={this.state.toggleStyle ? {backgroundSize: 'cover', opacity: 0.5, filter: 'grayscale(100%)'} : null} src={this.props.photo.images.low_resolution.url} height="193" width="auto"></img>
    )
  }
}


export default InstagramEntry;