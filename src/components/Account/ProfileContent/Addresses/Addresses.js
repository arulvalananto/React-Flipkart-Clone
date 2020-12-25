import React, { useState } from "react";
import "./Addresses.css";

const Addresses = () => {
   const [loading, setLoading] = useState(true);

   return (
      <div className="addresses">
         {loading ? (
            "Loading Addresses..."
         ) : (
            <>
               <h4>Addresses</h4>
            </>
         )}
      </div>
   );
};

export default Addresses;
