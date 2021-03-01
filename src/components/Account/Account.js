import React from "react";
import "./Account.css";
//components
import ProfileContent from "./ProfileContent/ProfileContent";
import Sidebar from "./Sidebar/Sidebar";

//ContextAPI
import { useStateValue } from "../../contextAPI/StateProvider";


const Account = ({ pathName }) => {
   const [{ user }] = useStateValue();
   return (
      user && (
         <div className="account">
            <div className="account__wrapper">
               <Sidebar />
               <ProfileContent pathName={pathName} />
            </div>
         </div>
      )
   );
};

export default Account;
