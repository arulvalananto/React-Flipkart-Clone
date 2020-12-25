import React, { useState } from "react";
import "./Wishlist.css";

const Wishlist = () => {
   const [loading, setLoading] = useState(true);

   return (
      <div className="wishlist">
         {loading ? (
            "Loading Wishlist..."
         ) : (
            <>
               <h4>Wishlist</h4>
            </>
         )}
      </div>
   );
};

export default Wishlist;
