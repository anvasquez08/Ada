import React from 'react' 
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Button from '@material-ui/core/Button';
export default class Landing extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  handleImageUpload(e){
    e.preventDefault()
    console.log('uploading')
    let input = document.getElementById('file')
    let data = new FormData()
    data.append('image', input.files[0])
    data.append('name', 'image')
    axios.post("/send",data)
    .then(({data})=>{
      console.log(data)
    })
    .catch(err=>console.log(err))
  }

  render(){
    return(
      <div style={{position: 'relative'}}>
        <img style={{background: 'rgba(0, 0, 0, 0.45)' , height: '50vh', width: '100vw', position: 'absolute'}}></img>
        <img style={{background: 'url(https://s3-eu-west-1.amazonaws.com/deepart-io/featured/deepart/bg-4.jpg) no-repeat center/cover', height: '50vh', width: '100vw'}}></img>
        <div style={{color: 'white', position: 'absolute', top: '70%', left: '40%', textAlign: 'center'}}>
          <h3>Find any clothing in seconds</h3>
          <form id="uploadbanner" encType="multipart/form-data" onSubmit={(e)=>this.handleImageUpload(e)}>
          <input id="file" name="image" type="file" />
          <input type="submit" value="submit" id="submit"/>
       </form>
        </div>
      </div>
    )
  }
}