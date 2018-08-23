import React from 'react' 
import Dropzone from 'react-dropzone'
import axios from 'axios'
// import Button from '@material-ui/core/Button';
// import '../assets/banner.jpg'
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
      //do something with the data-scores
      console.log(data)
    })
    .catch(err=>console.log(err))
  }

  render(){
    return(
      <div style={{position: 'relative'}}>
        <img style={{background: 'rgba(0, 0, 0, 0.4)' , height: '50vh', width: '100vw', position: 'absolute'}}></img>
        {/* <img style={{background: 'url(../assets/banner.jpg) no-repeat', backgroundPosition:'center top', backgroundSize: 'cover', height: '50vh', width: '100vw', marginTop: '200'}}></img> */}
        <div style={{color: 'white', position: 'absolute', top: '70%', left: '40%', textAlign: 'center'}}>
          <h3>Find any clothing in seconds</h3>
          <form id="uploadbanner" encType="multipart/form-data" onSubmit={(e)=>this.handleImageUpload(e)}>
          <div style={{display:'flex', flexWrap:'nowrap'}}>
          <input id="file" name="image" type="file"/>
          <input type="submit" value="submit" id="submit" style={{background: '#0095ff'}}/>
          </div>
        </form>
        </div>
      </div>
    )
  }
}