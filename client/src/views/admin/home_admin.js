import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import AddField from './addField';



const AdminDashboard = () => {
    return (
        <div>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route path="/viewAddField" component={AddField} />
                  
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default AdminDashboard;
