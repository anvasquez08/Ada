import React from 'react';
import InstagramEntry from '../components/InstagramEntry.jsx';

class Instagram extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPictures: []
    }
    this.select = this.select.bind(this);
  }

  select(url) {
    if (this.state.selectedPictures.indexOf(url) > -1) {
      let copy = this.state.selectedPictures.slice()
      copy.splice(copy.indexOf(url), 1)
      this.setState({
        selectedPictures: copy
      })
    } else {
      let copy = this.state.selectedPictures.slice()
      copy.push(url);
      this.setState({
        selectedPictures: copy
      })
    }
  }

  render() {
    return (
      <div>
        {this.props.photos.map((photo, idx) => {
          return <InstagramEntry photo={photo} key={idx} select={this.select}/>
          })
        }
      </div>
    )
  }
}


export default Instagram;