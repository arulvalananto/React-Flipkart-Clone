import React from "react";
import AddAddress from "./AddAddress/AddAddress";
import "./Addresses.css";
import { AddressList } from "./AddressList/AddressList";

const Addresses = () => {
   return (
      <div className="addresses">
         <h4 className="addresses__title">Manage Addresses</h4>
         <AddAddress />
         <AddressList />
      </div>
   );
};

export default Addresses;
