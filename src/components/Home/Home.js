import React from "react";

//Components
import CarouselList from "./CarouselList/CarouselList";
import Favorites from "./Favorites/Favorites";

const Home = () => {
   return (
      <div className="home">
         <CarouselList />
         <Favorites />
      </div>
   );
};

export default Home;
