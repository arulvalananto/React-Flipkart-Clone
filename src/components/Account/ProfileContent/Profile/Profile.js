import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../../contextAPI/StateProvider";
import { db } from "../../../../firebase";
import "./Profile.css";

const Profile = () => {
   const [{ user }] = useStateValue();
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
         .then((el) => {
            setLoading(false);
            setEmail(user?.email);
         });
   }, [user]);

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
            });
      } else {
         db.collection("users")
            .doc(user?.email)
            .update({
               displayName: firstName + " " + lastName,
               gender: gender,
               firstName: firstName,
               lastName: lastName,
            });
      }
      setEditPersonal(false);
   };
   const updateEmailAddress = () => {
      db.collection("users").doc(user?.email).update({
         email: email,
      });
      setEditEmail(false);
   };
   const updateMobileNumber = () => {
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
                  <div className="profile__sectionForm">
                     <div>
                        <input
                           type="text"
                           disabled={!editPersonal}
                           placeholder="First Name"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                           type="text"
                           disabled={!editPersonal}
                           placeholder="Last Name"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                        />
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
                  </div>
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
                     <div>
                        <input
                           type="text"
                           disabled={!editEmail}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        {editEmail ? (
                           <button onClick={updateEmailAddress}>Save</button>
                        ) : null}
                     </div>
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
                     <div>
                        <input
                           type="tel"
                           disabled={!editMobileNumber}
                           value={mobileNumber}
                           onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        {editMobileNumber ? (
                           <button onClick={updateMobileNumber}>Save</button>
                        ) : null}
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default Profile;
