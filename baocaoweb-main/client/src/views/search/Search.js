// src/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import './search.scss';
import { useHistory } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleHome = () => {
        history.push('/home');
      };
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=509eabd413524cd1b41f1dcb18f4b0cb`);
            setArticles(response.data.articles);
        } catch (err) {
            setError('Error fetching data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='background'>
      <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>
    Tìm kiếm những bài báo công nghệ bạn yêu thích
</h1><br/>

            <div className='search'>
            <input 
                type="text" 
                value={keyword} 
                onChange={handleInputChange} 
                placeholder="Enter keyword" 
            />
            <button onClick={handleSearch}>Search</button>
            <button className='buttonHome' onClick={handleHome}>Home</button>

            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p>{article.description}</p>1
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
