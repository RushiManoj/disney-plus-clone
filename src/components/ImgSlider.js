import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function imgSlider() {
  let settings = {
    // This sets up the slider
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Wrap>
        <img src="/images/slider-badging.jpg" />
      </Wrap>

      <Wrap>
        <img src="/images/slider-badag.jpg" />
      </Wrap>

      <Wrap>
        <img src="/images/slider-scale.jpg" />
      </Wrap>

      <Wrap>
        <img src="/images/slider-scales.jpg" />
      </Wrap>
    </Carousel>
  );
}

export default imgSlider;

const Carousel = styled(Slider)`
  margin-top: 20px;

  ul li button {
    // These are the bottom dots
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    //Here we are focusing the preset dots whose default-color is balck and setting it to white
    color: white;
  }

  .slick-list {
    overflow: visible; // to make the next image visible partially
  }

  button {
    z-index: 1; // to make the left arrow visible
  }
`;

const Wrap = styled.div`
  cursor: pointer;
  img {
    border: 4px solid transparent; // for the border around the image
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px; // this is the bg image
    transition-duration: 300ms;

    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;
