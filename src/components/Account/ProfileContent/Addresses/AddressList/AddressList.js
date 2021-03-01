import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { db } from "../../../../../firebase";
import { useStateValue } from "../../../../../contextAPI/StateProvider";

export const AddressList = () => {
   const [{ user, deliveryAddresses }, dispatch] = useStateValue();
   const [addresses, setAddresses] = useState([]);
   const [loading, setLoading] = useState(true);

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   useEffect(() => {
      db.collection("users")
         .doc(user?.email)
         .collection("deliveryAddresses")
         .get()
         .then((snapshot) => {
            setAddresses(
               snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
               }))
            );
         })
         .then((data) => setLoading(false));
   }, [deliveryAddresses, user, addresses]);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const deleteAddress = (id) => {
      db.collection("users")
         .doc(user?.email)
         .collection("deliveryAddresses")
         .doc(id)
         .delete();
   };

   const handleClose = () => {
      setAnchorEl(null);
   };
   return (
      <>
         {loading ? (
            <div className="addresses__list">Loading List of Addresses</div>
         ) : (
            <div className="addresses__list">
               {addresses?.map(({ id, data }) => (
                  <div className="addresses__content" key={id}>
                     <div className="addresses__details">
                        <div className="addresses__info">
                           <h6>{data?.name}</h6>
                           <h6>{data?.mobileNo}</h6>
                        </div>
                        <p>
                           {`${data?.address}, ${data?.locality}, ${data?.city}, ${data?.states} - ${data?.pincode}`}
                        </p>
                        <p className="addresses__addressType">
                           {data?.addressType?.toUpperCase()}
                        </p>
                     </div>
                     <div className="addresses__options">
                        <IconButton
                           aria-label="more"
                           aria-controls="long-menu"
                           aria-haspopup="true"
                           onClick={handleClick}
                        >
                           <MoreVert />
                        </IconButton>
                        <Menu
                           id="long-menu"
                           anchorEl={anchorEl}
                           keepMounted
                           open={open}
                           onClose={handleClose}
                        >
                           <MenuItem onClick={handleClose}>Edit</MenuItem>
                           <MenuItem
                              onClick={() => {
                                 handleClose();
                                 deleteAddress(id);
                              }}
                           >
                              Delete
                           </MenuItem>
                        </Menu>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </>
   );
};
