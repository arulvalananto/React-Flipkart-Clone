import { Carousel } from "react-bootstrap";
import React from "react";
import './CarouselList.css'

function CarouselList() {
   return (
      <Carousel className="p-2" indicators={false} >
         <Carousel.Item interval={3000}>
            <img
               className="d-block w-100"
               src="https://rukminim1.flixcart.com/flap/1688/280/image/7b8e5d1df0df2689.jpg?q=50"
               alt="First slide"
            />
         </Carousel.Item>
         <Carousel.Item interval={3000}>
            <img
               className="d-block w-100"
               src="https://rukminim1.flixcart.com/flap/1688/280/image/80ade980a9492bff.jpg?q=50"
               alt="First slide"
            />
         </Carousel.Item>
         <Carousel.Item interval={3000}>
            <img
               className="d-block w-100"
               src="https://rukminim1.flixcart.com/flap/1688/280/image/5a55bfde3a5acd85.jpg?q=50"
               alt="Third slide"
            />
         </Carousel.Item>
         <Carousel.Item interval={3000}>
            <img
               className="d-block w-100"
               src="https://rukminim1.flixcart.com/flap/1688/280/image/35ae9ac55b1161c3.jpg?q=50"
               alt="Third slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>
   );
}

export default CarouselList;
