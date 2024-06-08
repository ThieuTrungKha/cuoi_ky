import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import _ from 'lodash';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Statistical from './statistical';
import Nav from './Nav';
import './home.scss';
import Comment from '../comment/comment_form';
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
                    <Route path="/comment" component={Comment} />
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default Home;