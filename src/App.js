import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Header />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
