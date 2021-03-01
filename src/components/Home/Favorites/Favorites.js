import React from "react";
import "./Favorites.css";
import { products } from "../../../data/products";
import { Link } from "react-router-dom";

const Favorites = () => {
   return (
      <div className="favorites">
         <div className="favorites__titleBox">
            <h4>Discounts on your Favorites</h4>
            <button className="favorites__titleButton">VIEW ALL</button>
         </div>

         <div className="favorites__list">
            {products?.map((product) => (
               <Link to={`/product/${product.id}`} target="_blank">
                  <div className="favorite__list">
                     <img
                        src={product.image}
                        alt={product.shortName}
                        className="favorite__image"
                        width="200px"
                        height="200px"
                     />
                     <h6 className="favorite__title">{product.shortName}</h6>
                     <p className="favorite__offer">{product.offer}</p>
                     <p className="favorite__slogan">{product.slogan}</p>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Favorites;
