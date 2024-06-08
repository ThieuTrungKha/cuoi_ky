import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import _ from 'lodash';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Statistical from './statistical';
import Nav from './Nav';
import './home.scss';
import Search from '../search/Search';
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);
const Home = () => {
    return (
        <div>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route path="/home" exact component={Statistical} />
                    <Route path="/search" component={Search} />
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default Home;