import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Search from './views/search/Search';
import admin from './views/admin/home_admin';
function App() {




  return (
    <div className="App">
      <Router>
        <Switch>
        
          <Route exact path="/" component={Search} />
          <Route exact path="/home_admin" component={admin} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
