import React from "react";
import "./CarouselList.css";

//React-bootstrap
import { Carousel } from "react-bootstrap";

const imageSet = [
    {
        url:
            "https://rukminim1.flixcart.com/flap/1688/280/image/7b8e5d1df0df2689.jpg?q=50",
        name: "First Slide",
    },
    {
        url:
            "https://rukminim1.flixcart.com/flap/1688/280/image/80ade980a9492bff.jpg?q=50",
        name: "Second Slide",
    },
    {
        url:
            "https://rukminim1.flixcart.com/flap/1688/280/image/5a55bfde3a5acd85.jpg?q=50",
        name: "Third Slide",
    },
    {
        url:
            "https://rukminim1.flixcart.com/flap/1688/280/image/35ae9ac55b1161c3.jpg?q=50",
        name: "Fourth Slide",
    },
];

function CarouselList() {
    return (
        <Carousel className="p-2" indicators={false}>
            {imageSet.map(({ url, name }, idx) => (
                <Carousel.Item interval={3000} key={idx}>
                    <img className="d-block w-100" src={url} alt={name} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselList;
