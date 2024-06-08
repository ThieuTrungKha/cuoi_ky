import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './commentForm.scss';

const CommentForm = () => {
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isAsking, setIsAsking] = useState(false);
  const [openChatIndex, setOpenChatIndex] = useState(null);
  const [answerChanges, setAnswerChanges] = useState(0);

  useEffect(() => {
    axios.get('/home_server')
      .then(response => {
        setUserName(response.data.data.username);
        setUserID(response.data.data._id);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('/viewQuestion')
      .then(response => {
        setQuestions(response.data.dataQuestion);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('/viewAnswer')
      .then(response => {
        setAnswers(response.data.dataAnswer);
      })
      .catch(error => {
        console.error(error);
      });
  }, [answerChanges]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (questionTitle.trim() === '' || questionContent.trim() === '') return;

    const newQuestion = {
      userID,
      userName,
      title: questionTitle,
      content: questionContent,
    };

    axios.post('/addQuestion', newQuestion)
      .then(response => {
        setQuestions([newQuestion, ...questions]);
        setQuestionTitle('');
        setQuestionContent('');
        setIsAsking(false);
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  const handleAnswerSubmit = (questionIndex, answerContent) => {
    if (answerContent.trim() === '') return;
    const questionID = questions[questionIndex]._id
    const newAnswer = {
      userID,
      userName,
      content: answerContent,
      questionID,
    };

    axios.post('/addAnswer', newAnswer)
      .then(response => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers.push(response.data.answer);
        setQuestions(updatedQuestions);
        setOpenChatIndex(null);
        setAnswerChanges(Date.now());
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  const handleToggleAsking = () => {
    setIsAsking(!isAsking);
  };

  const handleToggleChat = (index) => {
    setOpenChatIndex(openChatIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit(index, e.target.value);
    }
  };

  return (

    <div id="forum-post-content" className="box-content">

      {!isAsking && (
        <div className="ask-question-button">
          <button onClick={handleToggleAsking}>Ask Question</button>
        </div>
      )}

      {isAsking && (
        <div className="comment-form">
          <div className="form-group custom-form">
            <label htmlFor="questionTitle">Question Title:</label>
            <input
              type="text"
              id="questionTitle"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group custom-form">
            <label htmlFor="questionContent">Question Content:</label>
            <textarea
              id="questionContent"
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group custom-form">
            <button onClick={handleQuestionSubmit}>Submit Question</button>
            <button onClick={handleToggleAsking}>Cancel</button>
          </div>
        </div>

      )}
      <br />
      {/* List Question */}
      <div className="answer-count">
        <h4>{questions.length} Questions</h4>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="discussion-comment">
          <div id="forum-post-answers-container" class="discussion-question-container">
            <div class="discussion-question">


              <div class="discussion-byline ">Posted <a class="discussion-byline-time"
                href="/community/how-can-i-create-a-basic-forum-and-what-to-learn-next"><time
                  datetime="2014-09-24T10:18:01Z" data-local="time-ago">{Date(question.createdAt)}</time></a> by <a class="discussion-author user-tooltip-link"
                    data-behavior="mini-profile-trigger" data-profile-name="arturoespinoza"
                    data-user-tooltip-link href="/profiles/arturoespinoza">{question.userName}
                </a>
              </div>
              {/* Tiêu đề câu hỏi */}
              <h1>{question.title}</h1>
              {/* nội dung câu hỏi  */}
              <div class="question markdown-zone">
                <p>{question.content}</p>
              </div>
              {/* nút answer */}
              {openChatIndex === null ? (
                <div className="chat-box form-group" >
                  <span className="answer-link" onClick={() => handleToggleChat(index)}>Answer</span>
                </div>
              ) : null}

            </div>
          </div>
          {openChatIndex === index ? (
            <div className="chat-box form-group">
              <label htmlFor={`answerContent_${index}`}>Your Answer:</label>
              <textarea
                id={`answerContent_${index}`}
                onKeyDown={(e) => handleKeyDown(e, index)}
                required
              ></textarea>
              <button onClick={() => handleAnswerSubmit(index, document.getElementById(`answerContent_${index}`).value)}>Submit Answer</button>
            </div>
          ) : null}
          {/* reply */}
          <div className="discussion-replies">
            <div className="secondary-heading answer-count">
              <h2>{answers
                .filter(answer => answer.questionID === question._id).length} Answer</h2>
            </div>
            {answers
              .filter(answer => answer.questionID === question._id)
              .map((answer, answerIndex) => (
                <div key={answerIndex} className="discussion-reply">
                  <div class="discussion-byline "><span class="discussion-author user-tooltip-link">{answer.userName}   <div class="user-tooltip tooltip tooltip-top ">
                  </div></span> <span class="discussion-byline-time"><time datetime="2014-09-24T11:35:12Z"
                    data-local="time-ago">{new Date(answer.createdAt).toLocaleString()}</time></span>
                  </div>
                  <div class="discussion-answer-text">
                    <div class="markdown-zone">
                      <p>{answer.content}</p>
                      <hr class="short-hr" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      ))
      }

    </div >
  );
};

export default CommentForm;
