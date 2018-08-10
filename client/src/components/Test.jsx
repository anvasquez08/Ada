import React from 'react' 
import axios from 'axios'
import { RingLoader } from 'react-spinners';
export default class Test extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data:[],
      showLoader: false,
    }
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(e){
    console.log('submitted')
    this.setState({showLoader: true})
    e.preventDefault()
    axios.get('/scrape',{params:{q:this.state.input}})
      .then(({data})=>this.setState({data, showLoader: false}))
  }

  render(){
    return(
      <div className="container">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type='text' onChange={(e)=>this.handleInput(e.target.value)} placeholder='search here'></input>
          <button type='submit'>Search</button>
        </form>
        <div className="col-md-12">
          <h1>Things</h1>
          {this.state.showLoader 
            ? <RingLoader
              color={'#123abc'} 
              loading={this.state.showLoader}
              />
            : <div className='row'>
                {this.state.data.map(thing=>(
                  <div className="col-md-4">
                    <img src={thing.imageUrl} style={{width: '100px', height: '100px', scale:'cover'}}></img>
                    <a href={thing.shopUrl}></a>
                  </div>
                  ))
                }
              </div>
          }
          
        </div>
      </div>
    )
  }
}