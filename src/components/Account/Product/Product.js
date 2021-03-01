import React from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { products } from "../../../data/products";
import { FlashOn, LocalOffer, ShoppingCart, Star } from "@material-ui/icons";

const Product = () => {
   const params = useParams();
   const product = products[params.id - 1];
   return (
      <div className="product__wrapper">
         <div className="product">
            <div className="product__left">
               <img
                  src={product.image}
                  alt={product.shortName}
                  className="product__image"
               />
               <div className="product__buttonContainer">
                  <button className="product__cartButton">
                     <ShoppingCart /> ADD TO CART
                  </button>
                  <button className="product__buyButton">
                     <FlashOn />
                     BUY NOW
                  </button>
               </div>
            </div>
            <div className="product__right">
               <h2 className="product__title">{product.longName}</h2>
               <div className="product__ratingBox">
                  <p className="product__rating">
                     {product.rating}
                     <Star fontSize="small" />
                  </p>
                  <p className="product__ratingCount">{product.ratingCount}</p>
               </div>
               <div className="product__priceBox">
                  <h1 className="product__price">₹{product.price}</h1>
                  <h5 className="product__originalPrice">
                     ₹{product.originalPrice}
                  </h5>
                  <p className="product__offer">{product.offer}</p>
               </div>
               <div className="product__offers">
                  <h4>Available offers</h4>
                  <p>
                     <LocalOffer fontSize="small" />
                     <b>Bank Offer</b> 10% off on HDFC Bank Credit Cards and
                     Credit/Debit EMI Transactions, up to ₹1500. On Orders of
                     ₹5000 <span>T&C</span>
                  </p>
                  <p>
                     <LocalOffer fontSize="small" />
                     <b>Bank Offer</b> 10% off on HDFC Bank Debit Card
                     Transactions, up to ₹500. On orders of ₹5000{" "}
                     <span>T&C</span>
                  </p>
                  <p>
                     <LocalOffer fontSize="small" />
                     Buy for 2 get ₹1500 off your Next Buy <span>T&C</span>
                  </p>
               </div>
               <div >
                  <p className="product__description">Description</p>
                  <p>{product.description}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Product;
