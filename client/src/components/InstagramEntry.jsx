import React from 'react';
import { Image } from "semantic-ui-react";

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
      <div style={this.state.toggleStyle ? {height:'180px', width: '180px', overflow: 'hidden'} : {height:'180px', width: '180px', overflow: 'hidden'}}>
      <Image onClick={() => {this.toggleStyle(); this.props.select(this.props.photo.images.low_resolution.url)}}
        style={this.state.toggleStyle
          ? {objectFit: 'cover', opacity: 0.5, filter: 'grayscale(100%)', backgroundPosition: 'center top', width: '100%'}
          : {objectFit: 'cover', backgroundPosition: 'center top', width: '100%'}}
        src={this.props.photo.images.low_resolution.url} />
      </div>
    )
  }
}

export default InstagramEntry;