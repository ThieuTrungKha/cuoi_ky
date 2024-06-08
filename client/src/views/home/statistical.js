import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import CommentForm from '../comment_home/comment_form';
const Statistical = () => {
  
    const [username, setUsername] = useState('');
 

 


    return (
        <div className='container'>
            
            <CommentForm username={username} />
        </div>

    );
};

export default Statistical;
