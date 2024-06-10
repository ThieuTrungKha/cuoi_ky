import React, { useState, useEffect } from 'react';
import './commentForm.scss'; // Import the CSS file
import axios from 'axios';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [feedback, setFeedback] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    axios.get('/home_server')
      .then(response => {
        setUserName(response.data.data.username);
        setUserID(response.data.data._id);
        console.log(response.data.data._id); // Log the updated userID
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('/viewComment')
      .then(response => {
        setDataUser(response.data.dataComment); // Update dataUser state with comments
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/addComment', { desc: comment, userID, userName });
      if (response.status === 200) {
        setFeedback('Comment submitted successfully!');
        // After successful submission, fetch the updated comments and update the state
        axios.get('/viewComment')
          .then(response => {
            setDataUser(response.data.dataComment);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        setFeedback('Failed to submit comment. Please try again.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setFeedback('An error occurred. Please try again.');
    }

    setComment('');
  };

  return (
    <div className="comment-form-container">
      <form onSubmit={handleSubmit} className="comment-form">
        {userName && (
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <p id="username" className='username'>{userName}</p>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="comment">Thảo luận:</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            aria-label="Enter your comment"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
        <div className="containerComment">
          <div className="row">
            <div className="row">
              {dataUser && dataUser.map((item) => (
                <div key={item._id} className="">
                  <div className="card">
                    <h5 className="card-title">{item.userName}</h5>
                    <p>-------</p>
                    <p className="card-text">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
