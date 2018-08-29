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
          <div id="4GDDQ91YIEgOiACSwmUKS4" class="jsx-416275461 wrapper">
            <div class="top-banner jsx-3126485111 HeaderSimple HeaderSimple--has-mobile-media" style={{position: "relative"}}>
              <div class="jsx-3126485111 HeaderSimple__Media" >
                <img src="images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg" alt=""
                  srcSet="//images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=432&amp;h=254&amp;q=85 432w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=720&amp;h=424&amp;q=85 720w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=1440&amp;h=848&amp;q=85 1440w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?w=2160&amp;h=1272&amp;q=85 2160w, //images.ctfassets.net/cvlcgjxo5px5/3twRR067LywU8UWQse4Y2E/37f4c7dda59b7094723773ce33136048/HP1_2x.jpg?q=85 2880w"
                  style={{ backgroundSize: "cover" }}
                  ></img>
              </div>
              <div style={{margin:"40px 54px", position:"absolute", top:"0", left:"0", right:"0", bottom:"0", textAlign:"center", color:"#FFF", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <div style={{width: "50%"}}className="jsx-3126485111 inner">
                  <h1 className="jsx-3126485111">
                    <p>Introducing
                  The Custom Clothing Studio</p>
                  </h1>
                  <h2 className="jsx-3126485111">
                    <p>Clothing made for you, just the way you want it.</p>
                  </h2>
                  <Link to="/detect" class="jsx-960340962 button Button Button--transparent Button--inline HeaderSimple__CTA">Try Out Now </Link>
                </div>
              </div>
            </div>
            <div className="Trend" style={{marginTop:100}}>
              <h1 style={{textAlign:"center"}}>
                What's Trending
              </h1>
              <Grid centered style={{marginTop:50}}>
                <div style={{margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                    <img src="https://builder.io/api/v1/image/assets%2F8vNMbZH3AvNtwzSXWef6QW77P102%2F348f1d9d44754191bc6cfd2cc3c74ec4?height=400&quality=75&width=400"></img>
                    <h3>Summer Trend 2018</h3>
                  </Grid.Column>
                </div>
                <div style={{margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                    <img src="https://builder.io/api/v1/image/assets%2F8vNMbZH3AvNtwzSXWef6QW77P102%2F25154b733dac4a93ac146d7f9f63f24a?height=400&quality=75&width=400"></img>
                    <h3>Top 10 Summer Kicks</h3>
                  </Grid.Column>
                </div>
                <div style={{margin: "12px 5px 20px 0px"}}>
                  <Grid.Column>
                    <img src="https://builder.io/api/v1/image/assets%2F8vNMbZH3AvNtwzSXWef6QW77P102%2F41d8b95970904727ab5557610d2b90ad?height=400&quality=75&width=400"></img>
                    <h3>The Ultimate Guide to Jumpsuits</h3>
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