import React from 'react' 
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
export default class Landing extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div style={{position: 'relative'}}>
        <img style={{background: 'rgba(0, 0, 0, 0.45)' , height: '50vh', width: '100vw', position: 'absolute'}}></img>
        <img style={{background: 'url(https://s3-eu-west-1.amazonaws.com/deepart-io/featured/deepart/bg-4.jpg) no-repeat center/cover', height: '50vh', width: '100vw'}}></img>
        <div style={{color: 'white', position: 'absolute', top: '70%', left: '40%', textAlign: 'center'}}>
          <h3>Find any clothing in seconds</h3>
          <Button style={{color: 'white', justifyContent: 'center'}}>Try it now!</Button>
        </div>
        {/* <div className='header'style={{width: "100vw", height: "66vh", background: "#FAC6CC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"space-around"}}>
          <div style={{width: "100vw", height: "50px",textAlign: "center"}}>Header</div>
          <div style={{flexGrow:2, display:'flex'}}>
            <div style={{alignSelf: "center", fontSize: "200%", color: "white", fontWeight: "bold"}}>BRAND</div>
          </div>
          <div style={{flexGrow:1}}>
            <Dropzone style={{width: '40vw', height: '200px', borderWidth: '2px', borderColor: 'rgb(102, 102, 102)', borderStyle: 'dashed', borderRadius: '5px', textAlign: 'center'}}>Drop files here</Dropzone>
          </div>
        </div>
        <div className='container'>
          
        </div> */}
      </div>
    )
  }
}