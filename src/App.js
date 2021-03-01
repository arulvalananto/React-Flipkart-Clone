import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useStateValue } from "./contextAPI/StateProvider";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { actionTypes } from "./contextAPI/reducer";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//components
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import Account from "./components/Account/Account";
import Home from "./components/Home/Home";
import Product from "./components/Account/Product/Product";
import { CircularProgress } from "@material-ui/core";

function App() {
   const [{ isLogin, user }, dispatch] = useStateValue();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
         if (authUser) {
            dispatch({
               type: actionTypes.SET_USER,
               user: {
                  displayName: authUser.email.split("@")[0],
                  email: authUser.email,
               },
            });
            setTimeout(() => {
               setLoading(false);
            }, 500);
         } else {
            dispatch({
               type: actionTypes.SET_USER,
               user: "",
            });
            setTimeout(() => {
               setLoading(false);
            }, 500);
         }
      });
   }, [dispatch]);
   return (
      <div className="app">
         {loading ? (
            <div className="app__loader">
               <CircularProgress color="#2874F0" />
            </div>
         ) : (
            <BrowserRouter>
               <Header />
               <Switch>
                  <Route path="/product/:id">
                     <Product />
                  </Route>
                  <Route path="/account/wishlist">
                     <Account pathName="wishlist" />
                  </Route>
                  <Route path="/account/orders">
                     <Account pathName="orders" />
                  </Route>
                  <Route path="/account/address">
                     <Account pathName="address" />
                  </Route>
                  <Route path="/account">
                     <Account />
                  </Route>
                  <Route path="/account">
                     <Account />
                  </Route>
                  <Route path="/" exact>
                     <Home />
                  </Route>
               </Switch>
               {isLogin && !user && <Auth />}
            </BrowserRouter>
         )}
      </div>
   );
}

export default App;
