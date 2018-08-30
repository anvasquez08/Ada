import React from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import NavBar from './NavBar.jsx'
import {
  Grid,
  Image,
  Menu,
  Form,
  Checkbox,
  Card,
  Icon,
  Button
} from "semantic-ui-react";

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="Main">
          <div id="4GDDQ91YIEgOiACSwmUKS4" className="jsx-416275461 wrapper">
            <div className="top-banner jsx-3126485111 HeaderSimple HeaderSimple--has-mobile-media" style={{position: "relative"}}>
              <div className="jsx-3126485111 HeaderSimple__Media" >
                {/* <img src="images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg" alt=""
                  srcSet="//images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=432&amp;h=254&amp;q=85 432w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=720&amp;h=424&amp;q=85 720w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=1440&amp;h=848&amp;q=85 1440w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=2160&amp;h=1272&amp;q=85 2160w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?q=85 2880w"
                  style={{ backgroundSize: "cover" }}
                  ></img> */}
                <video overflow="hidden" height="100%" width="100%" autoPlay loop src="https://videos.ctfassets.net/cvlcgjxo5px5/4vSRHQxtbikYSOOqyME2IG/f60840f3c2e750ddb4fd7eafe86d6cfb/BM_INTRO_V1_NOTEXT.mp4"></video>
              </div>
              <div style={{margin:"40px 54px", position:"absolute", top:"0", left:"0", right:"0", bottom:"0", textAlign:"center", color:"#FFF", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <div style={{width: "50%"}} className="jsx-3126485111 inner">
                  <p>Introducing<br />
                  ADA Style</p>
                    <p>Clothing made for you, just the way you want it.</p>
                  <Link to="/detect" className="jsx-960340962 button Button Button--transparent Button--inline HeaderSimple__CTA">Try Out Now </Link>
                </div>
              </div>
            </div>
            <div className="Trend" style={{marginTop:100}}>
              <h2 style={{textAlign:"center"}}>
                What's Trending
              </h2>
              <Grid centered style={{marginTop:50}}>
              <div style={{height: "350px", width: "350px", overflow: "hidden", margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                <video overflow="hidden" height="100%" width="100%" preload="auto" loop autoPlay src="https://images-na.ssl-images-amazon.com/images/I/910m2YoITcS.mp4"></video>
                </Grid.Column>
              </div>
                <div style={{margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                    <img src="https://builder.io/api/v1/image/assets%2F8vNMbZH3AvNtwzSXWef6QW77P102%2F348f1d9d44754191bc6cfd2cc3c74ec4?height=400&quality=75&width=400"></img>
                    <h5>Summer Trends 2018</h5>
                  </Grid.Column>
                </div>
                <div style={{margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                    <img src="https://builder.io/api/v1/image/assets%2F8vNMbZH3AvNtwzSXWef6QW77P102%2F25154b733dac4a93ac146d7f9f63f24a?height=400&quality=75&width=400"></img>
                    <h5>Top 10 Summer Kicks</h5>
                  </Grid.Column>
                </div>
                <div style={{margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                    <img src="https://builder.io/api/v1/image/assets%2F8vNMbZH3AvNtwzSXWef6QW77P102%2F41d8b95970904727ab5557610d2b90ad?height=400&quality=75&width=400"></img>
                    <h5>The Ultimate Guide to Jumpsuits</h5>
                  </Grid.Column>
                </div>
                <div style={{height: "350px", width: "350px", overflow: "hidden", margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                <video overflow="hidden" height="100%" width="100%" preload="auto" loop autoPlay src="https://images-na.ssl-images-amazon.com/images/I/91RhJj6xLrS.mp4"></video>
                </Grid.Column>
              </div>
              </Grid>
            </div>
          </div >
        </div>
      </div>
    )
  }
}

//images.ctfassets.net/cvlcgjxo5px5/4vhB037SJGUE8Qs0YyKqOu/3633711f512946893cfbaa6a151c131e/FP_Angela_Choe_Polka_2.jpg
//https://images-na.ssl-images-amazon.com/images/I/91RhJj6xLrS.mp4