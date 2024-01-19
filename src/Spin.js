
import './Spin.css';
// import Navbar from '../../Dashboard/Navbar/Navbar';
import React from "react";

class Spin extends React.Component {
  state = {
    list: [
      "₹100",
      "₹500",
      "₹9,999",
      "₹1",
      "₹60",
      "₹1,000",
      "₹4.44",
      // "₹0",
      // "₹333",
      // "₹33",
      // "₹60",
      // "₹1,000",
      // "₹4.44",
      // "₹0",
      // "₹333",
      "₹33",
    ],
   
    radius: 62.5, // PIXELS
    rotate: 90, // DEGREES
    easeOut: 0, // SECONDS
    angle: 0, // RADIANS
    top: null, // INDEX
    offset: null, // RADIANS
    net: null, // RADIANS
    result: null, // INDEX
    spinning: false
  };
   
  componentDidMount() {
    // generate canvas wheel on load
    this.renderWheel();
  }

  renderWheel() {
    // determine number/size of sectors that need to created
    let numOptions = this.state.list.length;
    let arcSize = (2 * Math.PI) / numOptions;
    this.setState({
      angle: arcSize
    });
    var Colorlist = ['red','purple','green','pink','orange','blue','maroon','violet']
  var  Colorlist = ( numOptions % Colorlist.length === 1) ? [...Colorlist] : [...Colorlist, ...Colorlist, ...Colorlist];

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = this.state.list[i];
      this.renderSector(i + 1, text, angle, arcSize, Colorlist[i]);
      angle += arcSize;
    }
  }

 

  renderSector(index, text, start, arc, color) {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width /2 ;
    let y = canvas.height/2;
    let radius = this.state.radius;
   
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 2.08;
    let textRadius = baseSize - 40;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "13px bold";
    ctx.fillStyle = "black";
    
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    // ctx.rotate(angle - arc / 2 );
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }


  spin = () => {
    let numOptions = this.state.list.length;
    let valuearray = []
    let angle =360/numOptions;
    for (let i = 0; i < numOptions; i++) {
        valuearray.push(9090+((angle*i)+(angle/2)))
        
    }

    let min=0;
    var va= Math.floor(Math.random() * (numOptions- min)) + min;
  
    document.getElementById('wheel').style.transition="all ease 3s";
    document.getElementById('wheel').style.transform = "rotate("+ valuearray[va]+"deg)";
    document.getElementById("stop").style.pointerEvents = "none";
    // calcalute result after wheel stops spinning
    var element = document.getElementById('SpinWheeliv');
    element.classList.remove('animate');
    setTimeout(function(){
      element.classList.add('animate');
     }, 50000);
    setTimeout(() => {

      this.setState({
        
        result: this.state.list[ (numOptions-1) -va],
        
      });       
     
    }, 3000);
  };


  reset = () => {
    // reset wheel and result
    document.getElementById('wheel').style.transform = "rotate("+ 90 +"deg)";
    document.getElementById('wheel').style.transition="all ease 0s";
    document.getElementById('stop').style.pointerEvents = "auto";
    this.setState({
    
      easeOut: 0,
      result: null,
      // spinning: false
    });
  };

  render() {
    return (
        <><section>
        {/* <Navbar /> */}
       
    </section><div className="spin-win">
            <div className="centers">
                <div id="SpinWheeliv"  className="SpinWheeliv">
                        <canvas
          id="wheel"
          width="260"
          height="260"
          
          
          style={{
            WebkitTransform: `rotate(${this.state.rotate}deg)`,
            WebkitTransition: `-webkit-transform ${
              this.state.easeOut
              
            }s ease-out`
          }}
        />
                 <button className="spin" id="stop" 
                           onClick={this.spin}
                            ></button>
                      
                    
                </div>
            </div>
            <h1 id='spin-win'>Spin And Win </h1>
            <div className='SpinCoinBtn'>
                <button type="button" className="btn" id="spin-btn"
                onClick={this.reset}
                >Spend 

25 coins</button>
<div>YOU WON: <span> {this.state.result}</span></div>
            </div>
            
        </div></>  

    );
  }
}

export default Spin