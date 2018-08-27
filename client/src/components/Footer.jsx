import React from 'react'
import IconFB from './svgs/IconFB.jsx'
import IconInsta from './svgs/IconInsta.jsx'
import IconTwt from './svgs/IconTwt.jsx'
export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <footer class="jsx-2851940331" style={{marginTop:"100px"}}>
        <div class="jsx-2851940331 inner" style={{padding: "0 16px"}}>
          <div class="row1 jsx-2851940331" style={{display:"flex", flexDirection: "row"}}>
            <div class="jsx-2325222291 input-wrapper" style={{flexGrow:7, maxWidth:450}}>
              <div class="jsx-2325222291" style={{marginBottom: 16}}>
                <span>Sign up for discounts from our partners</span>
              </div>
              <div className="jsx-1213838683 EmailCapture EmailCapture--slim">
                <form noValidate="" className="jsx-1213838683" style={{display:"flex"}}>
                  <div className="jsx-2325222291 input-wrapper email-capture-input" style={{flexGrow:1}}>
                    <input type="email" placeholder="Enter your email address" className="jsx-1839890849 input--transparent" style={{borderRight:'none',width:'100%', height:'40px', padding:'9px 16px 9px',border: '1px solid #000', backgroundColor:'transparent'}}></input>
                  </div>
                    <button className="jsx-960340962 button Button Button--transparent-black">JOIN NOW</button>
                </form>
              </div>
            </div>
            <div className="jsx-2851940331 social-links" style={{flexGrow:3, textAlign: 'end'}}>
              <div className="jsx-1473164680 container" style={{alignItems:"center"}}>
                <span>Follow Us:</span> &nbsp;
                <a style={{margin: "0 32px"}} target="_blank" rel="noopener noreferrer" href="https://github.com/Allende-HR/Allende-HR"
                  aria-label="Facebook" className="jsx-1473164680">
                  <IconFB/>
                </a>
                <a style={{marginRight: "32px"}} target="_blank" rel="noopener noreferrer" href="https://github.com/Allende-HR/Allende-HR" aria-label="Instagram"
                  className="jsx-1473164680">
                  <IconInsta/>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/Allende-HR/Allende-HR" aria-label="Twitter" class="jsx-1473164680">
                  <IconTwt/>
                </a>
              </div>
            </div>
          </div>
          <div className="row2" style={{display:"flex", flexDirection: "row"}}>
            <div className="jsx-3212225829 NavigationLinks" style={{display:"flex", flexDirection: "row", width: "calc(100% / 12 * 6 - 0.1px)", marginTop: "40px", flexWrap: "wrap"}}>
              <a href="/about" className="jsx-927076563 no-underline" style={{paddingRight:'16px', fontSize:'13px'}}>About Us</a>
              <a href="/faqs" className="jsx-927076563 no-underline" style={{paddingRight:'16px', fontSize:'13px'}}>FAQs</a>
            </div>
            <div className="jsx-2851940331 copyright text-secondary" style={{textAlign:"end", flexGrow:1, alignSelf:'flex-end'}}>
              <span className="jsx-2851940331">© 2018 ALLENDE INC</span>
            </div>
          </div>
        </div >
      </footer >
    )
  }
}