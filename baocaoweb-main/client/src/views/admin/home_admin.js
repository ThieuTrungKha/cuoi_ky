import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import getLanguage from './adminLanguage';
import getFramework from './adminFramework';
import AddField from './addField';



const AdminDashboard = () => {
    return (
        <div>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route path="/viewAddField" component={AddField} />
                    <Route path="/getLanguage" component={getLanguage} />
                    <Route path="/getFramework" component={getFramework} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default AdminDashboard;
