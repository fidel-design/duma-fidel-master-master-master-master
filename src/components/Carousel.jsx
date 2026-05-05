import React from 'react';
import shoec1 from '../assets/shoec1.jpg';
import shoec2 from '../assets/shoec2.jpg';

const Carousel = () => {
  return (
    <div id="mainCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">

      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src={shoec1}
            className="d-block w-100"
            style={{ height: "400px", objectFit: "cover" }}
            alt="slide1"
          />
          <div className="carousel-caption">
            <h3>New Sneakers Collection</h3>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            className="d-block w-100"
            style={{ height: "400px", objectFit: "cover" }}
            alt="slide2"
          />
          <div className="carousel-caption">
            <h3>Top Running Shoes</h3>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src={shoec2}
            className="d-block w-100"
            style={{ height: "400px", objectFit: "cover" }}
            alt="slide3"
          />
          <div className="carousel-caption">
            <h3>Best Deals Today</h3>
          </div>
        </div>

      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>

    </div>
  );
};

export default Carousel;