import React, { useEffect, useState } from "react";
import { actionTypes } from "../../../../contextAPI/reducer";
import { useStateValue } from "../../../../contextAPI/StateProvider";
import { db } from "../../../../firebase";
import "./Profile.css";

const Profile = () => {
   const [{ user }, dispatch] = useStateValue();
   const [loading, setLoading] = useState(true);

   const [editPersonal, setEditPersonal] = useState(false);
   const [editEmail, setEditEmail] = useState(false);
   const [editMobileNumber, setEditMobileNumber] = useState(false);

   const [gender, setGender] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [mobileNumber, setMobileNumber] = useState("");

   useEffect(() => {
      db.collection("users")
         .doc(user?.email)
         .get()
         .then((doc) => {
            setFirstName(doc.data()?.firstName);
            setLastName(doc.data()?.lastName);
            setGender(doc.data()?.gender);
            setEmail(doc.data()?.email);
            setMobileNumber(doc.data()?.phoneNumber);
         })
         // .then((data) => {
         //    dispatch({
         //       type: actionTypes.SET_USER_ADDITIONAL,
         //       payload: {
         //          firstName: firstName,
         //          lastName: lastName,
         //          gender: gender,
         //          email: email,
         //          phoneNumber: mobileNumber,
         //       },
         //    });
         // })
         .then((el) => {
            setLoading(false);
            setEmail(user?.email);
         });
   }, [user?.email]);

   const updatePersonalInformation = () => {
      if (lastName === "" || firstName === "" || gender === "") {
         db.collection("users")
            .doc(user?.email)
            .set({
               displayName: firstName + " " + lastName,
               gender: gender,
               firstName: firstName,
               lastName: lastName,
               email: user?.email,
            })
            .then((data) => {
               dispatch({
                  type: actionTypes.SET_USERNAME,
                  username: firstName + " " + lastName,
               });
            });
      } else {
         db.collection("users")
            .doc(user?.email)
            .update({
               displayName: firstName + " " + lastName,
               gender: gender,
               firstName: firstName,
               lastName: lastName,
            })
            .then((data) => {
               dispatch({
                  type: actionTypes.SET_USERNAME,
                  username: firstName + " " + lastName,
               });
            });
      }
      setEditPersonal(false);
   };
   const updateEmailAddress = (e) => {
      e.preventDefault();
      db.collection("users").doc(user?.email).update({
         email: email,
      });
      setEditEmail(false);
   };
   const updateMobileNumber = (e) => {
      e.preventDefault();
      db.collection("users")
         .doc(user?.email)
         .update({
            phoneNumber: +mobileNumber,
         });
      setEditMobileNumber(false);
   };

   return (
      <div className="profile">
         {loading ? (
            "Loading Personal Information..."
         ) : (
            <>
               <div className="profile__section">
                  <div className="profile__sectionTitle">
                     <h4>Profile Information</h4>
                     {editPersonal ? (
                        <p onClick={() => setEditPersonal(false)}>Cancel</p>
                     ) : (
                        <p onClick={() => setEditPersonal(true)}>Edit</p>
                     )}
                  </div>
                  <form className="profile__sectionForm">
                     <div className="profile__personalForm">
                        <input
                           type="text"
                           disabled={!editPersonal}
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                        />
                        {editPersonal && (
                           <label
                              className={`firstnameLabel ${
                                 (editPersonal ||
                                    firstName.length > 0 ||
                                    firstName !== "") &&
                                 "firstnameLabel--active"
                              }`}
                           >
                              First Name
                           </label>
                        )}
                        <input
                           type="text"
                           disabled={!editPersonal}
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                        />
                        {editPersonal && (
                           <label
                              className={`lastnameLabel ${
                                 (editPersonal || lastName.length > 0) &&
                                 "lastnameLabel--active"
                              }`}
                           >
                              Last Name
                           </label>
                        )}
                        {editPersonal ? (
                           <button onClick={updatePersonalInformation}>
                              Save
                           </button>
                        ) : null}
                     </div>
                     <p>Your Gender</p>
                     <div>
                        <input
                           type="radio"
                           disabled={!editPersonal}
                           value="Male"
                           checked={gender === "Male"}
                           onChange={(e) => setGender(e.target.value)}
                        />
                        <label>Male</label>
                        <input
                           type="radio"
                           disabled={!editPersonal}
                           value="Female"
                           checked={gender === "Female"}
                           onChange={(e) => setGender(e.target.value)}
                        />
                        <label>Female</label>
                     </div>
                  </form>
               </div>
               <div className="profile__section">
                  <div className="profile__sectionTitle">
                     <h4>Email Address</h4>
                     {editEmail ? (
                        <p onClick={() => setEditEmail(false)}>Cancel</p>
                     ) : (
                        <p onClick={() => setEditEmail(true)}>Edit</p>
                     )}
                     <p>Change Password</p>
                  </div>
                  <div className="profile__sectionForm">
                     <form onSubmit={updateEmailAddress}>
                        <input
                           type="email"
                           disabled={!editEmail}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                        />
                        {editEmail ? <button type="submit">Save</button> : null}
                     </form>
                  </div>
               </div>
               <div className="profile__section">
                  <div className="profile__sectionTitle">
                     <h4>Mobile Number</h4>
                     {editMobileNumber ? (
                        <p onClick={() => setEditMobileNumber(false)}>Cancel</p>
                     ) : (
                        <p onClick={() => setEditMobileNumber(true)}>Edit</p>
                     )}
                  </div>
                  <div className="profile__sectionForm">
                     <form onSubmit={updateMobileNumber}>
                        <input
                           type="tel"
                           disabled={!editMobileNumber}
                           pattern="[1-9]{1}[0-9]{9}"
                           title="Please enter exactly 10 digits"
                           maxLength={10}
                           value={mobileNumber}
                           onChange={(e) => setMobileNumber(e.target.value)}
                           required
                        />
                        {editMobileNumber ? (
                           <button type="submit">Save</button>
                        ) : null}
                     </form>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default Profile;
