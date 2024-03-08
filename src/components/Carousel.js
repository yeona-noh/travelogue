import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"



export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      arrows:false,
      infinite: true,
      autoplay: false,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div className="slideItems">
                             
        <Slider {...settings}>
          <div>
            <img src="img/hongkong.jpg" />
          </div>
          <div>
            <img src="img/santorini.jpg" />
          </div>
          <div>
            <img src="img/japan.jpg" />
          </div>
          <div>
            <img src="img/europe.jpg" />
          </div>       
            
        </Slider>
        </div>
    );
  }
}
