import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { db } from "../../../../../firebase";
import { statesOfIndia } from "../../../../../data/states";
import { actionTypes } from "../../../../../contextAPI/reducer";
import { useStateValue } from "../../../../../contextAPI/StateProvider";

const AddAddress = () => {
   const [{ user }, dispatch] = useStateValue();

   const [openAddAddress, setOpenAddAddress] = useState(false);
   const [name, setName] = useState("");
   const [mobileNo, setMobileNo] = useState("");
   const [pincode, setPincode] = useState("");
   const [locality, setLocality] = useState("");
   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [states, setStates] = useState("");
   const [landmark, setLandMark] = useState("");
   const [altPhone, setAltPhone] = useState("");
   const [addressType, setAddressType] = useState("");

   const toggleOpenAddAddress = () => {
      setOpenAddAddress((prevState) => !prevState);
   };
   const clearField = () => {
      setName("");
      setMobileNo("");
      setPincode("");
      setLocality("");
      setAddress("");
      setCity("");
      setStates("");
      setLandMark("");
      setAltPhone("");
      setAddressType("");
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      let newDeliveryAddress = {
         name: name,
         mobileNo: mobileNo,
         pincode: pincode,
         locality: locality,
         address: address,
         city: city,
         states: states,
         landmark: landmark,
         altPhone: altPhone,
         addressType: addressType,
      };
      dispatch({
         type: actionTypes.ADD_DELIVERY_ADDRESS,
         deliveryAddress: newDeliveryAddress,
      });
      db.collection("users")
         .doc(user?.email)
         .collection("deliveryAddresses")
         .add(newDeliveryAddress);
      toggleOpenAddAddress();
      clearField();
   };

   return (
      <div className="addAddress">
         {!openAddAddress ? (
            <div className="addAddress__close">
               <p onClick={toggleOpenAddAddress}>
                  <Add />
                  ADD A NEW ADDRESS
               </p>
            </div>
         ) : (
            <div className="addAddress__open">
               <p>ADD A NEW ADDRESS</p>
               {/* <button>Use my Current Address</button> */}
               <form onSubmit={handleSubmit} className="addAddress__form">
                  <div className="addAddress__formSection">
                     <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                     <input
                        type="tel"
                        pattern="[1-9]{1}[0-9]{9}"
                        maxLength="10"
                        title="10-digit number required"
                        placeholder="10-digit mobile number"
                        name="mobile number"
                        required
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                     />
                  </div>
                  <div className="addAddress__formSection">
                     <input
                        type="text"
                        pattern="[0-9]{6}"
                        maxLength="6"
                        placeholder="Pincode"
                        name="pincode"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                     />
                     <input
                        type="text"
                        placeholder="Locality"
                        name="locality"
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                     />
                  </div>
                  <div className="addAddress__formSection">
                     <textarea
                        name="addressLine"
                        rows="4"
                        cols="10"
                        tabIndex="5"
                        placeholder="Address(area and street)"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                     ></textarea>
                  </div>
                  <div className="addAddress__formSection">
                     <input
                        type="text"
                        placeholder="City/District/Town"
                        name="city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     />
                     <select
                        value={states}
                        onChange={(e) => setStates(e.target.value)}
                        required
                     >
                        <option value="">--Select State--</option>
                        {statesOfIndia.map((state) => (
                           <option key={state} value={state}>
                              {state}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="addAddress__formSection">
                     <input
                        type="text"
                        placeholder="Landmark (Optional)"
                        name="landmark"
                        value={landmark}
                        onChange={(e) => setLandMark(e.target.value)}
                     />
                     <input
                        type="tel"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        placeholder="Alternate Phone (Optional)"
                        name="alt phone"
                        value={altPhone}
                        onChange={(e) => setAltPhone(e.target.value)}
                     />
                  </div>
                  <h6 className="addAddress__addressType">Address Type</h6>
                  <div className="addAddress__formSection">
                     <input
                        type="radio"
                        value="home"
                        onChange={(e) => setAddressType(e.target.value)}
                        checked={addressType === "home"}
                        required
                     />
                     <label htmlFor="home">Home</label>

                     <input
                        type="radio"
                        value="work"
                        onChange={(e) => setAddressType(e.target.value)}
                        checked={addressType === "work"}
                     />
                     <label htmlFor="work">Work</label>
                  </div>
                  <div className="addAddress__formButtonSection">
                     <button>Save</button>
                     <p
                        onClick={() => {
                           toggleOpenAddAddress();
                           clearField();
                        }}
                     >
                        Cancel
                     </p>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
};

export default AddAddress;
