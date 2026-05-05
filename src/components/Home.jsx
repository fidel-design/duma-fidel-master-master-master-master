import React from "react";
import Carousel from "./Carousel";
import FeaturedProducts from "./FeaturedProducts";
import Getproduct from "./Getproduct";

const Home = () => {
  return (
    <div>
      <Carousel />
      <FeaturedProducts />
      <Getproduct />
    </div>
  );
};

export default Home;