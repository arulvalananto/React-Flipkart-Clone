import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useStateValue } from "./contextAPI/StateProvider";
import { auth } from "./firebase";
import { useEffect } from "react";
import { actionTypes } from "./contextAPI/reducer";
import "./App.css";
//components
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import Account from "./components/Account/Account";


function App() {
  const [{ isLogin, user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: {
            displayName: authUser.email.split("@")[0],
            email: authUser.email,
            phoneNumber: "",
            gender: "",
          },
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: "",
        });
      }
    });
  }, [dispatch]);
  console.log(user);

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/account">
            <Header />
            <Account />
          </Route>
          <Route path="/" exact>
            <Header />
          </Route>
        </Switch>
        {isLogin && !user && <Auth />}
      </BrowserRouter>
    </div>
  );
}

export default App;
