import React from 'react';
import Test from './Test.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        Test
        <Test/>
      </div>
      )
  }
}

export default App