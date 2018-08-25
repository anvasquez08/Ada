import React from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import NavBar from './NavBar.jsx'
// import Button from '@material-ui/core/Button';
// import '../assets/banner.jpg'
export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <div>
        <div className="Main" style={{display:"flex"}}>
          <div id="4GDDQ91YIEgOiACSwmUKS4" class="jsx-416275461 wrapper">
            <div class="top-banner jsx-3126485111 HeaderSimple HeaderSimple--has-mobile-media" style={{position: "relative"}}>
              <div class="jsx-3126485111 HeaderSimple__Media" >
                <img src="images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg" alt=""
                  srcset="//images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=432&amp;h=254&amp;q=85 432w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=720&amp;h=424&amp;q=85 720w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=1440&amp;h=848&amp;q=85 1440w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=2160&amp;h=1272&amp;q=85 2160w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?q=85 2880w"
                  style={{ backgroundSize: "cover" }}
                  ></img>
              </div>
              <div style={{margin:"40px 54px", position:"absolute", top:"0", left:"0", right:"0", bottom:"0", textAlign:"center", color:"#FFF", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <div style={{width: "50%"}}class="jsx-3126485111 inner">
                  <h1 class="jsx-3126485111">
                    <p>Introducing
                  The Custom Clothing Studio</p>
                  </h1>
                  <h2 class="jsx-3126485111">
                    <p>Clothing made for you, just the way you want it.</p>
                  </h2>
                  <Link to="/detect" class="jsx-960340962 button Button Button--transparent Button--inline HeaderSimple__CTA">Shop Custom Now </Link>
                </div>
              </div>
            </div>
            <div className="Trend">
              <h1 style={{marginLeft:"auto", marginRight:"auto"}}>
                What's Trending
              </h1>
            </div>
          </div >
        </div>
      </div>
    )
  }
}