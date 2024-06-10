import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './views/login/login';
import SignUp from './views/signup/sign_up';
import AdminLogin from './views/admin/admin_login';
import AddField from './views/admin/addField';
import Home from './views/home/home';
import Search from './views/search/Search';
import homeAdmin from './views/admin/home_admin';
import axios from 'axios'; 
import pageComment from './views/comment/comment_form'
function App() {
  const [isSuccess, setIsSuccess] = useState(() => {
    const saved = localStorage.getItem('isSuccess');
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/home_server');
        const success = response.data.success === "true";
        setIsSuccess(success);
        localStorage.setItem('isSuccess', success);
      } catch (error) {
        console.error("Error:", error.message);
        setIsSuccess(false);
        localStorage.setItem('isSuccess', false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />

          {isSuccess ? (
            <Route exact path="/home" component={Home} />
          ) : (
            <Redirect to="/" />
          )}
          <Route exact path="/home_admin" component={homeAdmin} />

          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/viewAddField" component={AddField} />
          <Route exact path="/getLanguage" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/commentPage" component={pageComment} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
