import React, { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {

  const [{user}, dispatch] = useStateValue();
  // const [user, setuser] = useState(null);

  return (
    <div className="app">
      {!user ? ( 
        <Login />
      ):(
      <div className="app__body">
        
        <Router>
            <Sidebar />
          <Switch>

            <Route path="/rooms/:roomId">
              <Chat />
            </Route>

            <Route path="/">
              <Chat />
              {/* <h1>Home Screen</h1> */}
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
